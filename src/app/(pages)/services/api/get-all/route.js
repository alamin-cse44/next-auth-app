import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const userCollection = db.collection("services");
  try {
    const services = await userCollection.find().toArray();
    return NextResponse.json({
      status: 200,
      message: "services found",
      data: services,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "services not found",
      error: error
    });
  }
};
