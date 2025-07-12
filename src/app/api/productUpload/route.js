import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Product from "@/models/productModel/page";
import slugify from "slug";
import { put } from "@vercel/blob";

export const POST = async (req) => {
  try {
    await connectMongo();

    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const image = formData.get("image");
    const description = formData.get("description");

    // Random 4 character code
    let random = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 4; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const slug = `${slugify(name, { lower: true })}-${slugify(random, { lower: true })}`;

    const existing = await Product.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Product already exists with this name" },
        { status: 400 }
      );
    }

    // Upload image to Vercel Blob
    const buffer = Buffer.from(await image.arrayBuffer());
    const blob = await put(image.name, buffer, {
      access: "public",
    });

    // Save product to DB
    const product = await Product.create({
      name,
      slug,
      price,
      description,
      imageUrl: blob.url,
    });

    console.log("✅ Product saved:", product);

    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    console.error("❌ Error saving product:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
