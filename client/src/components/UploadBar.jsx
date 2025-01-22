import React, { useState } from "react";
import { uploadFile } from "../services/fileUploadService";

export default function UploadBar({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const result = await uploadFile(file);
      console.log(result);
      alert(`File uploaded successfully: ${result.data._name}`);
      onUploadSuccess();
    } catch (error) {
      alert("Failed to upload the file. Please try again.");
    }
  };

  return (
    <div className="d-grid gap-2 col-3 mx-auto">
      <input
        type="file"
        className="form-control mb-2"
        onChange={handleFileChange}
        accept="*"
      />
      <button className="btn btn-primary" type="button" onClick={handleUpload}>
        Upload File
      </button>
    </div>
  );
}
