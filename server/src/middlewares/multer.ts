import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/');
    cb(null, uploadPath); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Name the file
  },
});

const upload = multer({ storage });
export default upload;
