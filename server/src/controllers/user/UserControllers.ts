import express from "express";
import Response from "../../utils/Response";

export default class UserControllers {
  /**
   * @param req
   * @param res
   */
  public static getFileList(
    req: express.Request,
    res: express.Response
  ): void {
     
  }

  /**
   * @param req
   * @param res
   */
  public static uploadFile(req: express.Request, res: express.Response): void {}

  /**
   * @param req
   * @param res
   */
  public static downloadFile(
    req: express.Request,
    res: express.Response
  ): void {}
}
