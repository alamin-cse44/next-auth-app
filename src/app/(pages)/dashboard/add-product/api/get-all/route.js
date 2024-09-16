import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const productCollection = db.collection("products");
  try {
    const products = await productCollection.find().toArray();
    return NextResponse.json({
      status: 200,
      message: "Products found",
      data: products,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Products not found",
      error: error,
    });
  }
};
