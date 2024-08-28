import connectDB from "@/lib/connectDB";

export const POST = async (request) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const newUser = await request.json();
    const res = await userCollection.insertOne(newUser);

    return Response.json({ message: "new user created successfully" });
  } catch (error) {
    return Response.json({ message: "error creating user" });
  }
};
