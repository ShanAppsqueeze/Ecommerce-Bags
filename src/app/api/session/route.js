// src/app/api/session/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = cookies().get("admin-session");

  if (session) {
    return NextResponse.json({ isLoggedIn: true, user: session.value });
  } else {
    return NextResponse.json({ isLoggedIn: false });
  }
}
