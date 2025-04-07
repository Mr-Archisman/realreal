import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { error } from 'console';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
const bucket = process.env.SUPABASE_BUCKET!;
const path = process.env.SUPABASE_BUCKET_PATH || '';

export async function GET() {
  const { data, error } = await supabase
    .from('properties')
    .select('id, title, description, price, location, latitude, longitude, property_type, status, rooms, images, area, tag');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}


export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = form.get('title')?.toString().trim();
    const description = form.get('description')?.toString().trim();
    const price = parseFloat(form.get('price')?.toString().trim() || '');
    const location = form.get('location')?.toString().trim();
    const property_type = form.get('property_type')?.toString().trim().toLowerCase();
    const status = form.get('status')?.toString().trim().toLowerCase() || 'available';
    const latitude = parseFloat(form.get('latitude')?.toString().trim() || '');
    const longitude = parseFloat(form.get('longitude')?.toString().trim() || '');
    const area = parseInt(form.get('area')?.toString().trim() || '');
    const tag = form.get('tag')?.toString().trim().toLowerCase();
    const rooms = form.get('rooms') ? JSON.parse(form.get('rooms') as string) : null;
    const imageFiles = form.getAll('images') as File[];

    if (!title || !description || isNaN(price) || !location || !property_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['house', 'apartment', 'commercial', 'land'].includes(property_type)) {
      return NextResponse.json(
        { error: 'Invalid property type' },
        { status: 400 }
      );
    }

    if (!tag || !['buy', 'sell', 'rent'].includes(tag)) {
      return NextResponse.json(
        { error: 'Invalid tag type' },
        { status: 400 }
      );
    }

    if (!['available', 'notavailable'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    if (area && area <= 0) {
      return NextResponse.json(
        { error: 'Area must be a positive number' },
        { status: 400 }
      );
    }

    const imageUrls: string[] = [];

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    for (const image of imageFiles) {
      if (!allowedMimeTypes.includes(image.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${image.name}. Only JPG, PNG, and WEBP are allowed.` },
          { status: 400 }
        );
      }

      const fileExt = image.name.split('.').pop();
      const fileName = `${path}/${crypto.randomUUID()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, image);

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      const { publicUrl } = supabase.storage.from(bucket).getPublicUrl(fileName).data;
      imageUrls.push(publicUrl);
    }

    // Insert into database
    const { data: property, error: insertError } = await supabase
      .from('properties')
      .insert({
        title,
        description,
        price,
        location,
        latitude: isNaN(latitude) ? null : latitude,
        longitude: isNaN(longitude) ? null : longitude,
        property_type,
        status,
        rooms,
        area: isNaN(area) ? null : area,
        tag,
        images: imageUrls
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Property created successfully', property });
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}