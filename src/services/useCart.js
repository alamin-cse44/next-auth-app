// src/hooks/useCart.js
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchCart = async ({ queryKey }) => {
  const session = queryKey[1];
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/api/${session?.data?.user?.email}`
  );
  return res?.data?.data;
};

export const useCartQuery = (session) => {
  return useQuery({
    queryKey: ["cart", session], 
    queryFn: fetchCart, 
    staleTime: 0,
  });
};
