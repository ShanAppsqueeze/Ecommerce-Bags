import { NextResponse } from "next/server";
import connectMongo from '@/lib/mongodb'; // you'll create this file
import Order from "@/models/Order/page";

export async function GET() {
  try {
    await connectMongo();

    const orders = await Order.find().sort({ createdAt: -1 }); // latest first

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch orders" }, { status: 500 });
  }
}
