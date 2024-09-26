import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/add-product/api/get-all`
    );

    return res.data;
  } catch (error) {
    return [];
  }
};


const fetchProduct = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/add-product/api/get-all`
  );
  return res?.data?.data;
};

export const useProductQuery = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
    staleTime: 0,
  });
};