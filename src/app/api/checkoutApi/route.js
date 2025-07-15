// app/api/checkout/route.js
import { NextResponse } from "next/server";
import connectMongo from '@/lib/mongodb'; // you'll create this file
import Order from "@/models/Order/page"; // you'll create this model

export async function POST(request) {
  try {
    const body = await request.json();

    await connectMongo();

    const newOrder = new Order(body);
    await newOrder.save();

    return NextResponse.json({ success: true, message: "Order placed!" }, { status: 201 });
  } catch (error) {
    console.error("Order saving error:", error);
    return NextResponse.json({ success: false, message: "Failed to save order." }, { status: 500 });
  }
}
