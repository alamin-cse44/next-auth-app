import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const cartCollection = db.collection("carts");
  try {
    const res = await cartCollection.deleteMany({
      email: params.email,
    });
    return NextResponse.json({
      status: 200,
      message: "Cart items are found",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
      error: error,
    });
  }
};
