import apiClient from "../utils/apiClient";

export const fetchFiles = async () => {
  try {
    const response = await apiClient.get("/getList");
    console.log(response.data);
    return response.data; // List of files
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};
