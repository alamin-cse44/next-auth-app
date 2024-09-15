import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const myBooking = await bookingCollection
      .find({ email: params.email })
      .toArray();
    return NextResponse.json({
      status: 200,
      message: "Bookings are found",
      data: myBooking,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Bookings are not found",
      error: error,
    });
  }
};
