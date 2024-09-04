import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = await db.collection("bookings");
  try {
    const res = await bookingCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return Response.json({
      message: "booking deleted successfully",
      response: res,
      status: "200",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return Response.status(500).json({ message: "Error deleting booking" });
  }
};

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const booking = await bookingCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return Response.json({
      status: 200,
      message: "booking is found",
      data: booking,
    });
  } catch (error) {
    console.error("Error finding booking:", error);
    return Response.status(500).json({ message: "Error finding booking" });
  }
};

export const PATCH = async (request, { params }) => {
  const db = await connectDB();
  const updateDoc = await request.json();
  console.log("update doc: ", updateDoc);
  const bookingCollection = db.collection("bookings");
  try {
    const booking = await bookingCollection.updateOne(
      {
        _id: new ObjectId(params.id),
      },
      { $set: { ...updateDoc } },
      { upsert: true }
    );
    return Response.json({
      status: 200,
      message: "booking is updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error finding booking:", error);
    return Response.status(500).json({ message: "Error finding booking" });
  }
};
