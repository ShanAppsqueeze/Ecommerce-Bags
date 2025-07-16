import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Product from '@/models/productModel/page';

export async function PUT(req) {
  try {
    await connectMongo();

    const body = await req.json();
    console.log("Incoming PUT body:", body);

    const { _id, name, price, description, isActive } = body;

    if (!_id || !name || !price || !description) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { name, price, description, isActive },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("API PUT error:", error); // 👈 this will show the error in terminal
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
  }
}