import apiClient from "../utils/apiClient";

export const downloadFile = async (fileName, actionType) => {
  try {
    const response = await apiClient.get(`/download/${fileName}`, {
      responseType: "blob",
    });

    const contentType = response.headers["content-type"];

    const fileBlob = new Blob([response.data], { type: contentType });
    const fileURL = window.URL.createObjectURL(fileBlob);

    if (actionType === "view") {
      const previewWindow = window.open(fileURL, "_blank");
      if (!previewWindow) {
        throw new Error("Failed to open new tab for file preview. Please check your popup blocker settings.");
      }
    }
    else {
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (error) {
    console.error("Error downloading or previewing file:", error);
    throw error;
  }
};
