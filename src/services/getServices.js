import axios from "axios";

export const getServices = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/pages/services/api/get-all"
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getServiceById = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/pages/services/api/${id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
