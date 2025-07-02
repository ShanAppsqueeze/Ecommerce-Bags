import connectMongo from "@/lib/mongodb";
import Contact from "@/models/contactusModel/User";

export async function GET() {
  try {
    await connectMongo();
    const contacts = await Contact.find().sort({ _id: -1 }); // newest first
    console.log("Fetched contacts:", contacts);
    
    return Response.json({ success: true, data: contacts });
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 });
  }
}
