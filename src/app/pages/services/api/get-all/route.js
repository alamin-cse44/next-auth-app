import connectDB from "@/lib/connectDB";

export const GET = async () => {
  const db = await connectDB();
  const userCollection = db.collection("services");
  try {
    const services = await userCollection.find().toArray();
    return Response.json({
      status: 200,
      message: "services found",
      data: services,
    });
  } catch (error) {
    console.log("error", error);
  }
};
