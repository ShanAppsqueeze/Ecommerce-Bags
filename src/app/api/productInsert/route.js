
import connectMongo from "@/lib/mongodb";
import Product from "@/models/productModel/page";

export async function GET() {
  try {
    await connectMongo();
    const products = await Product.find().sort({ _id: -1 });

    return Response.json({ success: true, data: products });
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 });
  }
}
