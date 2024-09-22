import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const db = await connectDB();
  // const orderData = await request.json();
  const { email, cartItems, orderDetails } = await request.json();
  console.log("email from server", email)
  try {
    const orderCollection = await db.collection("orders");
    const cartCollection = await db.collection("carts");
    const newOrder = await orderCollection.insertOne(orderDetails);
    const res = await cartCollection.deleteMany({
      email: email,
    });
    return NextResponse.json({
      status: 200,
      message: "Your order added successfully",
      data: newOrder,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
      error: error,
    });
  }
};
