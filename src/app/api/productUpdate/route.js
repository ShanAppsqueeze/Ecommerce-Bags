import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Product from '@/models/productModel/page';

export async function PUT(req) {
  try {
    await connectMongo();
    const { _id, name, price, isActive } = await req.json();

    if (!_id || !name || !price) {
      return NextResponse.json(
        { success: false, message: 'Missing fields' },
        { status: 400 }
      );
    }

    const updateFields = { name, price };
    if (typeof isActive === 'boolean') updateFields.isActive = isActive;

    const updated = await Product.findByIdAndUpdate(_id, updateFields, { new: true });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
