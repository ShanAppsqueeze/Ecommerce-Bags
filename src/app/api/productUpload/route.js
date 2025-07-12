// import { NextResponse } from "next/server";
// import connectMongo from "@/lib/mongodb";
// import Product from "@/models/productModel/page";
// import path from "path";
// import { writeFile } from "fs/promises";
// import slugify from "slug";

// export const POST = async (req) => {
//   try {
//     await connectMongo();

//     const formData = await req.formData();

//     const name = formData.get("name");
//     const price = formData.get("price");
//     const image = formData.get("image");
//     const description = formData.get("description");

//     let random = "";
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     const charactersLength = characters.length;
//     for (let i = 0; i < 4; i++) {
//       random += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }

//     // Generate slug
//     const productSlug = `${slugify(name, { lower: true })}-${slugify(random, {
//       lower: true,
//     })}`;

//     // Check if product with this slug already exists
//     const existing = await Product.findOne({ slug: productSlug });
//     if (existing) {
//       return NextResponse.json(
//         { success: false, message: "Product already exists with this name" },
//         { status: 400 }
//       );
//     }

//     // Save image
//     const buffer = Buffer.from(await image.arrayBuffer());
//     const filePath = path.join(process.cwd(), "public/uploads", image.name);
//     await writeFile(filePath, buffer);
//     const imageUrl = `/uploads/${image.name}`;

//     // Save product
//     const product = await Product.create({
//       name,
//       slug: productSlug,
//       price,
//       description,
//       imageUrl,
//     });

//     console.log("✅ Product saved:", product);

//     return NextResponse.json({ success: true, data: product });
//   } catch (err) {
//     console.error("❌ Error saving product:", err);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// };


import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Product from "@/models/productModel/page";
import { put } from "@vercel/blob";
import slugify from "slug";

export const POST = async (req) => {
  try {
    await connectMongo();

    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const image = formData.get("image");
    const description = formData.get("description");

    // Generate random string for slug uniqueness
    let random = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 4; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const slug = `${slugify(name, { lower: true })}-${slugify(random, { lower: true })}`;

    const existing = await Product.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Product with this name already exists" },
        { status: 400 }
      );
    }

    // Upload image to Vercel Blob
    const buffer = Buffer.from(await image.arrayBuffer());
    const uploaded = await put(`products/${image.name}`, buffer, {
      access: "public",
      contentType: image.type,
    });

    // Save product in DB
    const product = await Product.create({
      name,
      slug,
      price,
      description,
      imageUrl: uploaded.url,
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
