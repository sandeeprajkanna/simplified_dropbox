import * as express from "express";

export default class UserRoutes {
    public router = express.Router();
    constructor() {
        console.log("Mounting UserRoutes");
        this.initialize();
    }

    private initialize() {
        this.router.get("/getList", () => {});
        this.router.get("/download/:_fileName", () => {});
        this.router.post("/upload/:_fileName", () => {});
    }
}
