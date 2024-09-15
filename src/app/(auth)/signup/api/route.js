import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const exist = await userCollection.findOne({ email: newUser.email });
    if (exist) {
      return NextResponse.json({
        status: 303,
        message: "Email already exists",
      });
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 15);
    const res = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    });

    return NextResponse.json({
      status: 200,
      message: "User Created successfully",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "User could not be created",
      error: error,
    });
  }
};
