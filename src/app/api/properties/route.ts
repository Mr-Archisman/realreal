import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
const bucket = process.env.SUPABASE_BUCKET!;

export async function GET() {
  const { data, error } = await supabase
    .from('properties')
    .select('id, title, description, price, location, latitude, longitude, property_type, status, rooms, images, area, tag');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const form = await req.formData();

  const title = form.get('title');
  const description = form.get('description');
  const location = form.get('location');
  const latitude = form.get('latitude');
  const longitude = form.get('longitude');
  const price = form.get('price');
  const status = form.get('status');
  const property_type = form.get('property_type');
  const rooms = JSON.parse(form.get('rooms') as string);
  const area = form.get('area');
  const tag = form.get('tag');
  const url = form.getAll('images') as File[];

  const path = process.env.SUPABASE_BUCKET_PATH || '';
  const urls: string[] = [];

  for (const image of url) {
    const fileName = `${path}/${crypto.randomUUID()}.png`;
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, image);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const url = supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
    urls.push(url);
  }

  const { data: property, error: insertError } = await supabase.from('properties').insert({
    title,
    description,
    location,
    latitude,
    longitude,
    price,
    status,
    property_type,
    rooms,
    area,
    tag,
    url: urls
  }).select().single();

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

  return NextResponse.json({ message: 'Property created successfully', property });
}