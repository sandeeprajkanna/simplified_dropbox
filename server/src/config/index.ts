import { config } from "dotenv";
import  { IConfig } from "./types";

config();

export const Config: IConfig = Object.freeze({
    APP: "dropbox-clone",
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    DB_URI: process.env.DB_URI as string
});

export default Config;