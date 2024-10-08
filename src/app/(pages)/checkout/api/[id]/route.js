import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const db = await connectDB();
  const bookingData = await request.json();
  try {
    const bookingCollection = await db.collection("bookings");
    const newBooking = await bookingCollection.insertOne(bookingData);
    return NextResponse.json({
      status: 200,
      message: "Bookings added successfully",
      data: newBooking,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
      error : error
    });
  }
};
