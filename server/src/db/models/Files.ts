import { Schema } from "mongoose";

export interface IFile {
    uuid?: string;
    _name?: string;
    size?: number;
    fileType?: string;
    user?: string;
    path?: string;
    schemaVersion?: number;
    updatedAt?: Date;
}

export const FileSchema = new Schema<IFile>({
    uuid: String,
    // base64 string
    _name: {type: String, unique: true},
    size: Number,
    fileType: String,
    user: String,
    path: String,
    schemaVersion: {
        type: Number,
        default: 0
    },
}, { timestamps: true, versionKey: '_version' });
