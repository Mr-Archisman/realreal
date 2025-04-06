import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Real Estate API is running!' });
}