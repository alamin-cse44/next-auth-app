import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const orderCollection = db.collection("orders");
  try {
    const orders = await orderCollection.find().toArray();
    return NextResponse.json({
      status: 200,
      message: "orders found",
      data: orders,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "orders not found",
      error: error,
    });
  }
};
