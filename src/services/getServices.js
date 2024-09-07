export const getServices = async () => {
  try {
    const response = await fetch("http://localhost:3000/pages/services/api/get-all");
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/pages/services/api/${id}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
