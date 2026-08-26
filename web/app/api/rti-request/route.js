import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      ministry_department,
      public_authority,

      digilocker,
      name,
      gender,
      address,
      pin_code,
      
      is_bpl,
      bpl_card_number,
      bpl_card_filename,
      year_of_issue,
      issuing_authority,
      
      email,
      rti_text,
    } = body;

    console.log(body)

    // --------------------------------------------------
    // Required fields
    // --------------------------------------------------

    if (!ministry_department) {
      return NextResponse.json(
        { success: false, error: "Ministry/department is required" },
        { status: 400 }
      );
    }

    if (!public_authority) {
      return NextResponse.json(
        { success: false, error: "Public authority is required" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (!rti_text) {
      return NextResponse.json(
        { success: false, error: "RTI text is required" },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Personal details
    //
    // If DigiLocker is used:
    // Stores placeholder data in database
    // Actual values can be updated after DigiLocker verification.
    // --------------------------------------------------

    const finalName = digilocker
      ? "<fetch_from_digilocker>"
      : name;

    const finalGender = digilocker
      ? "<fetch_from_digilocker>"
      : gender;

    const finalAddress = digilocker
      ? "<fetch_from_digilocker>"
      : address;

    const finalPinCode = digilocker
      ? "<fetch_from_digilocker>"
      : pin_code;

    // Personal details are compulsory when DigiLocker is not used
    if (!digilocker) {
      if (!name) {
        return NextResponse.json(
          { success: false, error: "Name is required" },
          { status: 400 }
        );
      }

      if (!gender) {
        return NextResponse.json(
          { success: false, error: "Gender is required" },
          { status: 400 }
        );
      }

      if (!address) {
        return NextResponse.json(
          { success: false, error: "Address is required" },
          { status: 400 }
        );
      }

      if (!pin_code) {
        return NextResponse.json(
          { success: false, error: "Pin code is required" },
          { status: 400 }
        );
      }
    }

    // --------------------------------------------------
    // BPL validation
    // --------------------------------------------------

    if (is_bpl) {
      if (!bpl_card_number) {
        return NextResponse.json(
          { success: false, error: "BPL card number is required" },
          { status: 400 }
        );
      }

      if (!bpl_card_filename) {
        return NextResponse.json(
          { success: false, error: "BPL card file is required" },
          { status: 400 }
        );
      }

      if (!year_of_issue) {
        return NextResponse.json(
          { success: false, error: "BPL card year of issue is required" },
          { status: 400 }
        );
      }

      if (!issuing_authority) {
        return NextResponse.json(
          { success: false, error: "BPL card issuing authority is required" },
          { status: 400 }
        );
      }
    }

    // --------------------------------------------------
    // Insert RTI request
    // --------------------------------------------------

    const query = `
      INSERT INTO rti_requests (
        ministry_department,
        public_authority,
        digilocker,

        name,
        gender,
        address,
        pin_code,
        
        is_bpl,
        bpl_card_number,
        bpl_card_filename,
        year_of_issue,
        issuing_authority,
        
        email,
        rti_text
      )
      VALUES (
        $1, $2, $3,
        $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13,
        $14
      )
      RETURNING id, request_number, created_at;
    `;

    const values = [
      ministry_department,
      public_authority,
      digilocker ?? false,

      finalName,
      finalGender,
      finalAddress,
      finalPinCode,
      
      is_bpl ?? false,
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