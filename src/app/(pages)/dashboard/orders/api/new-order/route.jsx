import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const db = await connectDB();
  const orderData = await request.json();
  try {
    const orderCollection = await db.collection("orders");
    const newOrder = await orderCollection.insertOne(orderData);
    return NextResponse.json({
      status: 200,
      message: "Your order added successfully",
      data: newOrder,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
      error : error
    });
  }
};