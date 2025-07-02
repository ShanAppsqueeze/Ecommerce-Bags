import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Product from '@/models/productModel/page'; // Adjust the import path as needed
import path from 'path';
import { writeFile } from 'fs/promises';

export const POST = async (req) => {
  try {
    await connectMongo();

    const formData = await req.formData();

    const id = formData.get('id');
    const name = formData.get('name');
    const price = formData.get('price');
    const image = formData.get('image');

    const buffer = Buffer.from(await image.arrayBuffer());
    const filePath = path.join(process.cwd(), 'public/uploads', image.name);
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${image.name}`;

    const product = await Product.create({
      id,
      name,
      price,
      imageUrl,
    });

    console.log('✅ Product saved to DB:', product);

    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    console.error('❌ Error saving product:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
};
