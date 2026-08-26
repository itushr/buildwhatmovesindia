import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(request) {
  try {
    const payload = await request.json();

    // First try FastAPI service if running at http://localhost:8000/generate-receipt-pdf
    try {
      const fastApiRes = await fetch('http://localhost:8000/generate-receipt-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (fastApiRes.ok) {
        const arrayBuffer = await fastApiRes.arrayBuffer();
        const pdfBuffer = Buffer.from(arrayBuffer);
        return new NextResponse(pdfBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename=RTI_Receipt_${payload.regNo?.replace(/\//g, '_') || 'DOPT'}.pdf`
          }
        });
      }
    } catch (e) {
      // Fallback to calling python script directly via subprocess
    }

    // Direct Python Subprocess Fallback Execution
    const tmpDir = os.tmpdir();
    const payloadPath = path.join(tmpDir, `rti_payload_${Date.now()}.json`);
    const outputPath = path.join(tmpDir, `rti_receipt_${Date.now()}.pdf`);

    fs.writeFileSync(payloadPath, JSON.stringify(payload));

    const aiDir = path.resolve(process.cwd(), '../ai');
    const safeAiDir = aiDir.replace(/\\/g, '/');
    const safePayloadPath = payloadPath.replace(/\\/g, '/');
    const safeOutputPath = outputPath.replace(/\\/g, '/');

    const pythonScript = `import sys, json; sys.path.insert(0, '${safeAiDir}'); from app.services.pdf_generator import generate_rti_receipt_pdf; data = json.load(open('${safePayloadPath}')); open('${safeOutputPath}', 'wb').write(generate_rti_receipt_pdf(data))`;

    const pythonCmds = ['python3', '/usr/local/bin/python3', '/opt/homebrew/bin/python3', '/usr/bin/python3', 'python'];
    let generatedSuccess = false;

    for (const pyBin of pythonCmds) {
      try {
        await execPromise(`${pyBin} -c "${pythonScript.replace(/"/g, '\\"')}"`, { 
          cwd: aiDir,
          env: { ...process.env, PATH: `/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin:${process.env.PATH || ''}`, PYTHONPATH: aiDir }
        });
        if (fs.existsSync(outputPath)) {
          generatedSuccess = true;
          break;
        }
      } catch (pyErr) {
        // Continue to next candidate binary
      }
    }

    if (generatedSuccess && fs.existsSync(outputPath)) {
      const pdfBuffer = fs.readFileSync(outputPath);

      // Cleanup temp files asynchronously
      fs.unlink(payloadPath, () => {});
      fs.unlink(outputPath, () => {});

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename=RTI_Receipt_${payload.regNo?.replace(/\//g, '_') || 'DOPT'}.pdf`
        }
      });
    }

    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  } catch (err) {
    console.error('PDF Generation API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
