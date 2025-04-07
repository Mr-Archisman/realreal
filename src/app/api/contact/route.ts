import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(req: Request) {
  const { name, email, message, phone } = await req.json();
  const { error } = await supabase.from('contact_us').insert({ name, email, message ,phone });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Contact form submitted successfully' });
}