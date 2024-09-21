// src/hooks/useCart.js
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// Add to Cart
const addCartItem = async (item) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/api/add-to-cart`,
    item
  );
  return response.data;
};

export const useAddCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem, // Pass function in object syntax
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Failed to add cart item", error);
    },
  });
};
