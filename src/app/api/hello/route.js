
// app/api/hello/route.js

// export async function GET(request) {
//   const data = {
//     message: "Hello from Next.js API!",
//     time: new Date().toISOString(),
//   };

//   return Response.json(data);
// }



import connectMongo from "@/lib/mongodb";
import Contact from "@/models/User";

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const { name, email, message } = body;

    const newContact = await Contact.create({ name, email, message });
    return Response.json({ success: true, data: newContact });
  } catch (error) {
    return Response.json({ success: false, error: "Failed to save contact" }, { status: 500 });
  }
}



