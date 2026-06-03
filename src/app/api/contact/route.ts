import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In a real application, you'd send an email (e.g., using Resend or SendGrid) or save to a database.
    console.log("New contact form submission received:", data);
    
    // Simulate a brief network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Message received successfully. We will be in touch shortly." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to process request." }, { status: 500 });
  }
}
