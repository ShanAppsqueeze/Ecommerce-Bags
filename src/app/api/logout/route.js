import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.set("admin-session", "", {
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ success: true, message: "Logged out" });
}
