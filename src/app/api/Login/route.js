import connectMongo from "@/lib/mongodb";
import Login from "@/models/loginModel/page"; // Make sure this path is correct

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return Response.json({ success: false, message: "Invalid content type" }, { status: 400 });
    }

    await connectMongo();
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const user = await Login.findOne({ email });

    if (!user || user.password !== password) {
      return Response.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    return Response.json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
