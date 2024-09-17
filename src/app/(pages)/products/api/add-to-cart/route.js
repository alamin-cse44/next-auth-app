import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const db = await connectDB();
  const cartData = await request.json();
  try {
    const cartCollection = await db.collection("carts");
    const newItem = await cartCollection.insertOne(cartData);
    return NextResponse.json({
      status: 200,
      message: "Product added in the cart successfully",
      data: newItem,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
      error : error
    });
  }
};