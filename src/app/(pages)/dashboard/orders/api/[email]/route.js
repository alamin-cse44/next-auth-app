import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const orderCollection = db.collection("orders")
  try {
    const myOrders = await orderCollection
      .find({ email: params.email })
      .toArray();
    return NextResponse.json({
      status: 200,
      message: "Orders are found",
      data: myOrders,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "orders are not found",
      error: error,
    });
  }
};
