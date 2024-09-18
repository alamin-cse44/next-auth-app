import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const cartCollection = db.collection("carts");
  try {
    const cartItem = await cartCollection
      .find({ email: params.email })
      .toArray();
    return NextResponse.json({
      status: 200,
      message: "Cart items are found",
      data: cartItem,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Cart items are not found",
      error: error,
    });
  }
};
