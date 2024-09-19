import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const cartCollection = await db.collection("carts");
  try {
    const res = await cartCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({
      message: "cart item deleted successfully",
      response: res,
      status: "200",
    });
  } catch (error) {
    return NextResponse.status(500).json({
      message: "Error deleting cart item",
    });
  }
};
