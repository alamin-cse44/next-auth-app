import connectDB from "@/lib/connectDB";
import { services } from "@/lib/services";

export const GET = async () => {
  const db = await connectDB();

  const serviceCollection = db.collection("services");
  try {
    await serviceCollection.deleteMany();
    const res = await serviceCollection.insertMany(services);
    return res.json({ message: "services updated successfully" });
  } catch (error) {
    console.log("error", error);
  }
};
