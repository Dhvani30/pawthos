// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/db';
// import { partners } from '@/db/schema';
// import { eq } from 'drizzle-orm';

// // Validation helpers
// function isValidEmail(email: string): boolean {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// function isValidIndianPhone(phone: string): boolean {
//   const phoneRegex = /^\+91[6-9]\d{9}$/;
//   return phoneRegex.test(phone);
// }

// function isValidType(type: string): boolean {
//   const validTypes = ['Animal Shelter', 'Veterinary Clinic', 'NGO', 'Individual Rehabilitator'];
//   return validTypes.includes(type);
// }

// function isValidStatus(status: string): boolean {
//   const validStatuses = ['pending', 'approved', 'rejected'];
//   return validStatuses.includes(status);
// }

// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const id = searchParams.get('id');

//     // Single partner by ID
//     if (id) {
//       if (!id || isNaN(parseInt(id))) {
//         return NextResponse.json(
//           { error: 'Valid ID is required', code: 'INVALID_INPUT' },
//           { status: 400 }
//         );
//       }

//       const partner = await db
//         .select()
//         .from(partners)
//         .where(eq(partners.id, parseInt(id)))
//         .limit(1);

//       if (partner.length === 0) {
//         return NextResponse.json(
//           { error: 'Partner not found', code: 'PARTNER_NOT_FOUND' },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(partner[0], { status: 200 });
//     }

//     // List partners with filtering and pagination
//     const status = searchParams.get('status');
//     const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
//     const offset = parseInt(searchParams.get('offset') || '0');

//     // Validate status if provided
//     if (status && !isValidStatus(status)) {
//       return NextResponse.json(
//         { error: 'Invalid status. Must be one of: pending, approved, rejected', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     let query = db.select().from(partners);

//     // Apply status filter if provided
//     if (status) {
//       query = query.where(eq(partners.status, status));
//     }

//     const results = await query.limit(limit).offset(offset);

//     return NextResponse.json(results, { status: 200 });
//   } catch (error) {
//     console.error('GET error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error: ' + error },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Extract and validate required fields
//     const {
//       shelterName,
//       type,
//       contactName,
//       phone,
//       email,
//       location,
//       role,
//       websiteUrl,
//       animalsServedYearly,
//       story
//     } = body;

//     // Validate required fields
//     if (!shelterName || !shelterName.trim()) {
//       return NextResponse.json(
//         { error: 'Shelter name is required', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     if (!type || !type.trim()) {
//       return NextResponse.json(
//         { error: 'Type is required', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     if (!contactName || !contactName.trim()) {
//       return NextResponse.json(
//         { error: 'Contact name is required', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     if (!phone || !phone.trim()) {
//       return NextResponse.json(
//         { error: 'Phone is required', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     if (!email || !email.trim()) {
//       return NextResponse.json(
//         { error: 'Email is required', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     if (!location || !location.trim()) {
//       return NextResponse.json(
//         { error: 'Location is required', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     // Validate type
//     if (!isValidType(type)) {
//       return NextResponse.json(
//         { error: 'Invalid type. Must be one of: Animal Shelter, Veterinary Clinic, NGO, Individual Rehabilitator', code: 'INVALID_TYPE' },
//         { status: 400 }
//       );
//     }

//     // Validate phone format
//     if (!isValidIndianPhone(phone.trim())) {
//       return NextResponse.json(
//         { error: 'Invalid phone format. Must be in format: +91[6-9]XXXXXXXXX', code: 'INVALID_PHONE' },
//         { status: 400 }
//       );
//     }

//     // Validate email format
//     if (!isValidEmail(email.trim())) {
//       return NextResponse.json(
//         { error: 'Invalid email format', code: 'INVALID_EMAIL' },
//         { status: 400 }
//       );
//     }

//     // Prepare insert data with sanitized inputs
//     const insertData: any = {
//       shelterName: shelterName.trim(),
//       type: type.trim(),
//       contactName: contactName.trim(),
//       phone: phone.trim(),
//       email: email.trim().toLowerCase(),
//       location: location.trim(),
//       status: 'pending',
//       createdAt: new Date().toISOString()
//     };

//     // Add optional fields if provided
//     if (role && role.trim()) {
//       insertData.role = role.trim();
//     }

//     if (websiteUrl && websiteUrl.trim()) {
//       insertData.websiteUrl = websiteUrl.trim();
//     }

//     if (animalsServedYearly !== undefined && animalsServedYearly !== null) {
//       insertData.animalsServedYearly = parseInt(animalsServedYearly);
//     }

//     if (story && story.trim()) {
//       insertData.story = story.trim();
//     }

//     // Insert into database
//     const newPartner = await db
//       .insert(partners)
//       .values(insertData)
//       .returning();

//     return NextResponse.json(newPartner[0], { status: 201 });
//   } catch (error) {
//     console.error('POST error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error: ' + error },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const id = searchParams.get('id');

//     // Validate ID
//     if (!id || isNaN(parseInt(id))) {
//       return NextResponse.json(
//         { error: 'Valid ID is required', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     // Check if partner exists
//     const existingPartner = await db
//       .select()
//       .from(partners)
//       .where(eq(partners.id, parseInt(id)))
//       .limit(1);

//     if (existingPartner.length === 0) {
//       return NextResponse.json(
//         { error: 'Partner not found', code: 'PARTNER_NOT_FOUND' },
//         { status: 404 }
//       );
//     }

//     const body = await request.json();

//     // Prepare update data
//     const updates: any = {};

//     // Validate and add fields if provided
//     if (body.shelterName !== undefined) {
//       if (!body.shelterName.trim()) {
//         return NextResponse.json(
//           { error: 'Shelter name cannot be empty', code: 'INVALID_INPUT' },
//           { status: 400 }
//         );
//       }
//       updates.shelterName = body.shelterName.trim();
//     }

//     if (body.type !== undefined) {
//       if (!isValidType(body.type)) {
//         return NextResponse.json(
//           { error: 'Invalid type. Must be one of: Animal Shelter, Veterinary Clinic, NGO, Individual Rehabilitator', code: 'INVALID_TYPE' },
//           { status: 400 }
//         );
//       }
//       updates.type = body.type.trim();
//     }

//     if (body.contactName !== undefined) {
//       if (!body.contactName.trim()) {
//         return NextResponse.json(
//           { error: 'Contact name cannot be empty', code: 'INVALID_INPUT' },
//           { status: 400 }
//         );
//       }
//       updates.contactName = body.contactName.trim();
//     }

//     if (body.role !== undefined) {
//       updates.role = body.role ? body.role.trim() : null;
//     }

//     if (body.phone !== undefined) {
//       if (!isValidIndianPhone(body.phone.trim())) {
//         return NextResponse.json(
//           { error: 'Invalid phone format. Must be in format: +91[6-9]XXXXXXXXX', code: 'INVALID_PHONE' },
//           { status: 400 }
//         );
//       }
//       updates.phone = body.phone.trim();
//     }

//     if (body.email !== undefined) {
//       if (!isValidEmail(body.email.trim())) {
//         return NextResponse.json(
//           { error: 'Invalid email format', code: 'INVALID_EMAIL' },
//           { status: 400 }
//         );
//       }
//       updates.email = body.email.trim().toLowerCase();
//     }

//     if (body.location !== undefined) {
//       if (!body.location.trim()) {
//         return NextResponse.json(
//           { error: 'Location cannot be empty', code: 'INVALID_INPUT' },
//           { status: 400 }
//         );
//       }
//       updates.location = body.location.trim();
//     }

//     if (body.websiteUrl !== undefined) {
//       updates.websiteUrl = body.websiteUrl ? body.websiteUrl.trim() : null;
//     }

//     if (body.animalsServedYearly !== undefined) {
//       updates.animalsServedYearly = body.animalsServedYearly !== null ? parseInt(body.animalsServedYearly) : null;
//     }

//     if (body.story !== undefined) {
//       updates.story = body.story ? body.story.trim() : null;
//     }

//     if (body.status !== undefined) {
//       if (!isValidStatus(body.status)) {
//         return NextResponse.json(
//           { error: 'Invalid status. Must be one of: pending, approved, rejected', code: 'INVALID_INPUT' },
//           { status: 400 }
//         );
//       }
//       updates.status = body.status;
//     }

//     // If no updates provided, return error
//     if (Object.keys(updates).length === 0) {
//       return NextResponse.json(
//         { error: 'No valid fields to update', code: 'INVALID_INPUT' },
//         { status: 400 }
//       );
//     }

//     // Update partner
//     const updatedPartner = await db
//       .update(partners)
//       .set(updates)
//       .where(eq(partners.id, parseInt(id)))
//       .returning();

//     return NextResponse.json(updatedPartner[0], { status: 200 });
//   } catch (error) {
//     console.error('PATCH error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error: ' + error },
//       { status: 500 }
//     );
//   }
// }
// src/app/api/partner/route.ts
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Save to 'partners' collection in Firestore
    const docRef = await addDoc(collection(db, 'partners'), {
      ...data,
      createdAt: new Date().toISOString(),
    });

    return Response.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Firebase save error:', error);
    return Response.json({ error: 'Failed to save partner data' }, { status: 500 });
  }
}