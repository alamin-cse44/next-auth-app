import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const serviceCollection = db.collection("services");
  try {
    const service = await serviceCollection.findOne({ _id: params.id });
    return NextResponse.json({
      status: 200,
      message: "service is found",
      data: service,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "service is not found",
      error: error,
    });
  }
};
