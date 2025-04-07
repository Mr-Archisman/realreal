import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('properties')
    .select('id, title, description, location, latitude, longitude, price, status, property_type, rooms, area, tag, images')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  return NextResponse.json(data);
}