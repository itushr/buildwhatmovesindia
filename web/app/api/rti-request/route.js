import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      ministry_department,
      public_authority,
      digilocker,

      email,
      name,
      gender,
      address,
      pin_code,

      is_bpl,
      bpl_card_number,
      bpl_card_filename,
      year_of_issue,
      issuing_authority,

      rti_text,
    } = body;

    // Required fields
    if (!ministry_department) {
      return NextResponse.json(
        { error: "Ministry/department is required" },
        { status: 400 }
      );
    }

    if (!public_authority) {
      return NextResponse.json(
        { error: "Public authority is required" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!rti_text) {
      return NextResponse.json(
        { error: "RTI text is required" },
        { status: 400 }
      );
    }

    // Required when DigiLocker is NOT used
    if (!digilocker) {
      if (!name || !gender || !address || !pin_code) {
        return NextResponse.json(
          {
            error:
              "Name, gender, address and pin code are required when DigiLocker is not used",
          },
          { status: 400 }
        );
      }
    }

    // Required when applicant is BPL
    if (is_bpl) {
      if (
        !bpl_card_number ||
        !bpl_card_filename ||
        !year_of_issue ||
        !issuing_authority
      ) {
        return NextResponse.json(
          {
            error:
              "BPL card number, BPL card filename, year of issue and issuing authority are required",
          },
          { status: 400 }
        );
      }
    }

    const query = `
      INSERT INTO rti_requests (
        ministry_department,
        public_authority,
        digilocker,
        email,
        name,
        gender,
        address,
        pin_code,
        is_bpl,
        bpl_card_number,
        bpl_card_filename,
        year_of_issue,
        issuing_authority,
        rti_text
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14
      )
      RETURNING id, created_at;
    `;

    const values = [
      ministry_department,
      public_authority,
      digilocker ?? false,
      
      // Personal details stored when without DigiLocker
      digilocker ? null : name,
      digilocker ? null : gender,
      digilocker ? null : address,
      digilocker ? null : pin_code,

      is_bpl ?? false,
      
      // BPL details only stored when applicant is BPL
      is_bpl ? bpl_card_number : null,
      is_bpl ? bpl_card_filename : null,
      is_bpl ? year_of_issue : null,
      is_bpl ? issuing_authority : null,
      
      email,
      rti_text,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(
      {
        success: true,
        message: "RTI request created successfully",
        request: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("RTI API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create RTI request",
      },
      { status: 500 }
    );
  }
}