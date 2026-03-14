// app/api/templates/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Template } from "@/models/Template";

export const dynamic = 'force-dynamic'; // Caching disable karne ke liye

export async function GET() {
  try {
    await connectDB();
    
    // Check karein ki connection ke baad data mil raha hai ya nahi
    const templates = await Template.find({}).lean();

    console.log("DB Data Found:", templates.length); // Terminal mein check karein

    if (!templates || templates.length === 0) {
      return NextResponse.json([], { status: 200 }); // Error ki jagah empty array dein taaki frontend crash na ho
    }

    return NextResponse.json(templates);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}