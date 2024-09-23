import axios from "axios";

export const getServices = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/api/get-all`
    );

    return res.data;
  } catch (error) {
    return [];
  }
};

export const getServiceById = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/api/${id}`
    );
    return res.data;
  } catch (error) {
    return [];
  }
};
