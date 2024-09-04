import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = await db.collection("bookings");
  try {
    const res = await bookingCollection.deleteOne({ _id: new ObjectId(params.id) });
    return Response.json({
      message: "User deleted successfully",
      response: res,
      status: "200",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return Response.status(500).json({ message: "Error deleting user" });
  }
};
