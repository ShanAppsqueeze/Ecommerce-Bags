// app/Dashboard/layout.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const session = cookies().get("admin-session");

  // ⛔ Avoid redirecting to /Dashboard/*
  if (!session) redirect("/Login");

  return <section>{children}</section>;
}
