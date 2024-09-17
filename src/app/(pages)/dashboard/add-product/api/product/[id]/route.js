import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const productCollection = await db.collection("products");
  try {
    const res = await productCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({
      message: "Product deleted successfully",
      response: res,
      status: "200",
    });
  } catch (error) {
    return NextResponse.status(500).json({ message: "Error deleting product" });
  }
};

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const booking = await bookingCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({
      status: 200,
      message: "booking is found",
      data: booking,
    });
  } catch (error) {
    return NextResponse.status(500).json({ message: "Error finding booking" });
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
    return NextResponse.json({
      status: 200,
      message: "booking is updated successfully",
      data: booking,
    });
  } catch (error) {
    return NextResponse.status(500).json({ message: "Error finding booking" });
  }
};
