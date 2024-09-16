import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const db = await connectDB();
  const productData = await request.json();
  try {
    const productCollection = await db.collection("products");
    const newProduct = await productCollection.insertOne(productData);
    return NextResponse.json({
      status: 200,
      message: "Product is added successfully",
      data: newProduct,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
      error: error,
    });
  }
};
