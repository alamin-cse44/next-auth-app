import { useMutation, useQueryClient } from "@tanstack/react-query";

// Function to handle placing an order
const placeOrder = async ({ email, cartItems, orderDetails }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/orders/api/new-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, cartItems, orderDetails }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to place order");
  }

  return response.json();
};

// Mutation hook for placing an order
export const useOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, cartItems, orderDetails }) => {
      return placeOrder({ email, cartItems, orderDetails });
    },
    onSuccess: () => {
      // Invalidate the cart query to update the cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
