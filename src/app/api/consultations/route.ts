// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/db';
// import { consultations } from '@/db/schema';
// import { eq, desc } from 'drizzle-orm';

// // Validation helpers
// const isValidIndianPhone = (phone: string): boolean => {
//   const phoneRegex = /^\+91[6-9]\d{9}$/;
//   return phoneRegex.test(phone);
// };

// const isValidEmail = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// const VALID_SPECIES = ['dog', 'cat', 'bird', 'rabbit', 'other'];
// const VALID_STATUSES = ['submitted', 'scanned', 'designed', 'printed', 'fitted', 'completed'];

// // Generate unique case ID
// async function generateCaseId(): Promise<string> {
//   try {
//     const existingConsultations = await db
//       .select()
//       .from(consultations)
//       .orderBy(desc(consultations.caseId))
//       .limit(1);

//     let nextNumber = 1;

//     if (existingConsultations.length > 0) {
//       const highestCaseId = existingConsultations[0].caseId;
//       const numericPart = highestCaseId.split('-').pop();
//       if (numericPart) {
//         nextNumber = parseInt(numericPart, 10) + 1;
//       }
//     }

//     const paddedNumber = nextNumber.toString().padStart(4, '0');
//     return `PAP-2025-${paddedNumber}`;
//   } catch (error) {
//     console.error('Error generating case ID:', error);
//     throw error;
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const {
//       ownerName,
//       petName,
//       species,
//       location,
//       injuryDescription,
//       phone,
//       email,
//       mediaUrls
//     } = body;

//     // Validate required fields
//     if (!ownerName || !petName || !species || !location || !injuryDescription || !phone) {
//       return NextResponse.json({
//         error: 'Missing required fields: ownerName, petName, species, location, injuryDescription, phone',
//         code: 'INVALID_INPUT'
//       }, { status: 400 });
//     }

//     // Trim string inputs
//     const trimmedOwnerName = ownerName.trim();
//     const trimmedPetName = petName.trim();
//     const trimmedSpecies = species.trim().toLowerCase();
//     const trimmedLocation = location.trim();
//     const trimmedInjuryDescription = injuryDescription.trim();
//     const trimmedPhone = phone.trim();
//     const trimmedEmail = email ? email.trim().toLowerCase() : null;

//     // Validate phone format
//     if (!isValidIndianPhone(trimmedPhone)) {
//       return NextResponse.json({
//         error: 'Invalid phone format. Must be in format: +91[6-9]XXXXXXXXX',
//         code: 'INVALID_PHONE'
//       }, { status: 400 });
//     }

//     // Validate email format if provided
//     if (trimmedEmail && !isValidEmail(trimmedEmail)) {
//       return NextResponse.json({
//         error: 'Invalid email format',
//         code: 'INVALID_EMAIL'
//       }, { status: 400 });
//     }

//     // Validate species
//     if (!VALID_SPECIES.includes(trimmedSpecies)) {
//       return NextResponse.json({
//         error: `Invalid species. Must be one of: ${VALID_SPECIES.join(', ')}`,
//         code: 'INVALID_SPECIES'
//       }, { status: 400 });
//     }

//     // Generate case ID
//     const caseId = await generateCaseId();

//     // Prepare media URLs
//     const finalMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];

//     // Create consultation
//     const newConsultation = await db.insert(consultations)
//       .values({
//         caseId,
//         ownerName: trimmedOwnerName,
//         petName: trimmedPetName,
//         species: trimmedSpecies,
//         location: trimmedLocation,
//         injuryDescription: trimmedInjuryDescription,
//         phone: trimmedPhone,
//         email: trimmedEmail,
//         mediaUrls: finalMediaUrls,
//         status: 'submitted',
//         createdAt: new Date().toISOString()
//       })
//       .returning();

//     return NextResponse.json(newConsultation[0], { status: 201 });
//   } catch (error) {
//     console.error('POST error:', error);
//     return NextResponse.json({
//       error: 'Internal server error: ' + error
//     }, { status: 500 });
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const id = searchParams.get('id');

//     // Single consultation by ID
//     if (id) {
//       const parsedId = parseInt(id);
//       if (isNaN(parsedId)) {
//         return NextResponse.json({
//           error: 'Valid ID is required',
//           code: 'INVALID_INPUT'
//         }, { status: 400 });
//       }

//       const consultation = await db.select()
//         .from(consultations)
//         .where(eq(consultations.id, parsedId))
//         .limit(1);

//       if (consultation.length === 0) {
//         return NextResponse.json({
//           error: 'Consultation not found',
//           code: 'CONSULTATION_NOT_FOUND'
//         }, { status: 404 });
//       }

//       return NextResponse.json(consultation[0]);
//     }

//     // List consultations with filters
//     const status = searchParams.get('status');
//     const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
//     const offset = parseInt(searchParams.get('offset') || '0');

//     // Validate status if provided
//     if (status && !VALID_STATUSES.includes(status)) {
//       return NextResponse.json({
//         error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
//         code: 'INVALID_STATUS'
//       }, { status: 400 });
//     }

//     let query = db.select().from(consultations);

//     if (status) {
//       query = query.where(eq(consultations.status, status));
//     }

//     const results = await query
//       .orderBy(desc(consultations.createdAt))
//       .limit(limit)
//       .offset(offset);

//     return NextResponse.json(results);
//   } catch (error) {
//     console.error('GET error:', error);
//     return NextResponse.json({
//       error: 'Internal server error: ' + error
//     }, { status: 500 });
//   }
// }

// export async function PATCH(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const id = searchParams.get('id');

//     if (!id || isNaN(parseInt(id))) {
//       return NextResponse.json({
//         error: 'Valid ID is required',
//         code: 'INVALID_INPUT'
//       }, { status: 400 });
//     }

//     const parsedId = parseInt(id);

//     // Check if consultation exists
//     const existing = await db.select()
//       .from(consultations)
//       .where(eq(consultations.id, parsedId))
//       .limit(1);

//     if (existing.length === 0) {
//       return NextResponse.json({
//         error: 'Consultation not found',
//         code: 'CONSULTATION_NOT_FOUND'
//       }, { status: 404 });
//     }

//     const body = await request.json();
//     const updates: any = {};

//     // Validate and prepare updates
//     if (body.ownerName !== undefined) {
//       updates.ownerName = body.ownerName.trim();
//     }

//     if (body.petName !== undefined) {
//       updates.petName = body.petName.trim();
//     }

//     if (body.species !== undefined) {
//       const trimmedSpecies = body.species.trim().toLowerCase();
//       if (!VALID_SPECIES.includes(trimmedSpecies)) {
//         return NextResponse.json({
//           error: `Invalid species. Must be one of: ${VALID_SPECIES.join(', ')}`,
//           code: 'INVALID_SPECIES'
//         }, { status: 400 });
//       }
//       updates.species = trimmedSpecies;
//     }

//     if (body.location !== undefined) {
//       updates.location = body.location.trim();
//     }

//     if (body.injuryDescription !== undefined) {
//       updates.injuryDescription = body.injuryDescription.trim();
//     }

//     if (body.phone !== undefined) {
//       const trimmedPhone = body.phone.trim();
//       if (!isValidIndianPhone(trimmedPhone)) {
//         return NextResponse.json({
//           error: 'Invalid phone format. Must be in format: +91[6-9]XXXXXXXXX',
//           code: 'INVALID_PHONE'
//         }, { status: 400 });
//       }
//       updates.phone = trimmedPhone;
//     }

//     if (body.email !== undefined) {
//       if (body.email) {
//         const trimmedEmail = body.email.trim().toLowerCase();
//         if (!isValidEmail(trimmedEmail)) {
//           return NextResponse.json({
//             error: 'Invalid email format',
//             code: 'INVALID_EMAIL'
//           }, { status: 400 });
//         }
//         updates.email = trimmedEmail;
//       } else {
//         updates.email = null;
//       }
//     }

//     if (body.mediaUrls !== undefined) {
//       updates.mediaUrls = Array.isArray(body.mediaUrls) ? body.mediaUrls : [];
//     }

//     if (body.status !== undefined) {
//       if (!VALID_STATUSES.includes(body.status)) {
//         return NextResponse.json({
//           error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
//           code: 'INVALID_STATUS'
//         }, { status: 400 });
//       }
//       updates.status = body.status;
//     }

//     // Prevent updating immutable fields
//     if (body.id !== undefined || body.caseId !== undefined || body.createdAt !== undefined) {
//       return NextResponse.json({
//         error: 'Cannot update id, caseId, or createdAt fields',
//         code: 'INVALID_INPUT'
//       }, { status: 400 });
//     }

//     if (Object.keys(updates).length === 0) {
//       return NextResponse.json({
//         error: 'No valid fields to update',
//         code: 'INVALID_INPUT'
//       }, { status: 400 });
//     }

//     const updated = await db.update(consultations)
//       .set(updates)
//       .where(eq(consultations.id, parsedId))
//       .returning();

//     return NextResponse.json(updated[0]);
//   } catch (error) {
//     console.error('PATCH error:', error);
//     return NextResponse.json({
//       error: 'Internal server error: ' + error
//     }, { status: 500 });
//   }
// }
// src/app/api/consultation/route.ts
// src/app/api/consultation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Validation helpers (same as before)
const isValidIndianPhone = (phone: string): boolean => {
  const phoneRegex = /^\+91[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const VALID_SPECIES = ['dog', 'cat', 'bird', 'rabbit', 'other'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      ownerName,
      petName,
      species,
      location,
      injuryDescription,
      phone,
      email,
      mediaUrls
    } = body;

    // Validate required fields
    if (!ownerName || !petName || !species || !location || !injuryDescription || !phone) {
      return NextResponse.json({
        error: 'Missing required fields',
        code: 'INVALID_INPUT'
      }, { status: 400 });
    }

    // Trim & validate
    const trimmedPhone = phone.trim();
    if (!isValidIndianPhone(trimmedPhone)) {
      return NextResponse.json({
        error: 'Invalid phone format. Must be +91[6-9]XXXXXXXXX',
        code: 'INVALID_PHONE'
      }, { status: 400 });
    }

    const trimmedEmail = email ? email.trim().toLowerCase() : null;
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      return NextResponse.json({
        error: 'Invalid email format',
        code: 'INVALID_EMAIL'
      }, { status: 400 });
    }

    const trimmedSpecies = species.trim().toLowerCase();
    if (!VALID_SPECIES.includes(trimmedSpecies)) {
      return NextResponse.json({
        error: `Invalid species. Must be one of: ${VALID_SPECIES.join(', ')}`,
        code: 'INVALID_SPECIES'
      }, { status: 400 });
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'consultations'), {
      ownerName: ownerName.trim(),
      petName: petName.trim(),
      species: trimmedSpecies,
      location: location.trim(),
      injuryDescription: injuryDescription.trim(),
      phone: trimmedPhone,
      email: trimmedEmail,
      mediaUrls: Array.isArray(mediaUrls) ? mediaUrls : [],
      status: 'submitted',
      createdAt: new Date().toISOString()
    });

    return NextResponse.json(
      { id: docRef.id, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Firebase consultation error:', error);
    return NextResponse.json(
      { error: 'Failed to save consultation' },
      { status: 500 }
    );
  }
}