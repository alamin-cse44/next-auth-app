import axios from "axios";

export const getProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/add-product/api/get-all`
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};