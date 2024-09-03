import connectDB from "@/lib/connectDB";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const myBooking = await bookingCollection.find({ email: params.email }).toArray();
    return Response.json({
      status: 200,
      message: "Bookings are found",
      data: myBooking,
    });
  } catch (error) {
    console.log("error", error);
  }
};
