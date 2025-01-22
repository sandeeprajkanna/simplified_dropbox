import express from "express";
import Response from "../../utils/Response";
import Database from "../../db/index";
import { MulterRequest } from "../../types";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

export default class UserControllers {
  /**
   * Get the list of files stored in the database.
   * @param req
   * @param res
   */
  public static async getFileList(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const files = await Database.FIle.find({}, { _id: 0, __v: 0 }).lean();
      console.log(files);
      Response.ok(res, files);
    } catch (error) {
      console.error("Error fetching file list:", error);
      Response.okError(res, "Failed to fetch file list");
    }
  }

  /**
   * Upload a file and store metadata in the database.
   * @param req
   * @param res
   */
  public static async uploadFile(
    req: MulterRequest,
    res: express.Response
  ): Promise<void> {
    try {
      if (!req.file) {
        Response.badRequest(res, "No file uploaded");
        return;
      }
      console.log(req.file);
      const fileMetadata = {
        uuid: uuidv4(),
        _name: req.file.originalname,
        size: req.file.size,
        fileType: req.file.mimetype,
        user: req.body.user || "Unknown User",
        path: req.file.path,
        schemaVersion: 1,
      };

      const fileDoc = new Database.FIle(fileMetadata);
      await fileDoc.save();

      Response.ok(res, fileMetadata);
    } catch (error) {
      console.error("Error uploading file:", error);
      Response.okError(res, "Failed to upload file");
    }
  }

  /**
   * Download a file by its file name.
   * @param req
   * @param res
   */
  public static async downloadFile(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      console.log(req.params);
      const fileName = req.params._fileName;

      const file = await Database.FIle.findOne({ _name: fileName }).lean();
      if (!file) {
        Response.ok(res, "File not found");
        return;
      }

      const filePath = path.resolve(file.path || "");
      if (!fs.existsSync(filePath)) {
        Response.okError(res, "File not found on the server");
        return;
      }

      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error("Error during file download:", err);
          Response.serverError(res, "Failed to download file");
        }
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      Response.serverError(res, "Failed to download file");
    }
  }
}
