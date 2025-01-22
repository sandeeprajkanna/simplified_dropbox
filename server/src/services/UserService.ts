import VError from "verror";
import Database from "../db";
import path from "path";
import fs from "fs";

export default class UserService {

    public static async getList(): Promise<any> {
        try {
            const files = await Database.FIle.find({}, { _id: 0, __v: 0 }).lean();
            if (files) {
                return files;
            }
            console.log("file list fetch failed!");
            return null;
        }
        catch(err) {
            throw err;
        }
    }

    public static async uploadFile(fileMetadata: any): Promise<any> {
        try {
            const fileDoc = new Database.FIle(fileMetadata);
            await fileDoc.save();
            return fileDoc;
        }
        catch(err) {
            throw err;
        }
    }

    public static async downloadFile(fileName: String): Promise<any> {
        try {
            const file = await Database.FIle.findOne({ _name: fileName }).lean();
            console.log(file);
            if (!file) {
                throw new VError({name: "SearchError"}, "cannot find fileName in DB " + fileName);
            }

            const filePath = path.resolve(file.path || "");
            if (!fs.existsSync(filePath)) {
                throw new VError({name: "ServerError"}, "File Not found on Server " + fileName);
            }
            
            return filePath;
        }
        catch(err) {
            throw err;
        }
    }
}