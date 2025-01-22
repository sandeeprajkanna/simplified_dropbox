import * as express from "express";
import UserControllers from "./UserControllers";
import upload from "../../middlewares/multer";

export default class UserRoutes {
    public router = express.Router();
    constructor() {
        console.log("Mounting UserRoutes");
        this.initialize();
    }

    private initialize() {
        this.router.get("/getList", UserControllers.getFileList);
        this.router.get("/download/:_fileName", UserControllers.downloadFile);
        this.router.post("/upload", upload.single("file"), UserControllers.uploadFile);
    }
}
