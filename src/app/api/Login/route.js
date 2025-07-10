import connectMongo from "@/lib/mongodb";
import Login from "@/models/loginModel/page";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ success: false, message: "Invalid content type" }, { status: 400 });
    }

    await connectMongo();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const user = await Login.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Set session cookie via response object
    const response = NextResponse.json({ success: true, message: "Login successful", user });

    response.cookies.set("admin-session", user._id.toString(), {
      httpOnly: true,
      path: "/",
      // maxAge: 60 * 60 * 24, // 1 day
       maxAge: 60, // 1 day
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
