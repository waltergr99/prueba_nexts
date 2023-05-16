import { Response } from "express";
import { ErrorResponse } from "../type";

const handleError = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw.message);
  const response : ErrorResponse = {
    status: 500,
    error: error,
    errorDetail: errorRaw.message
  }
  console.log(response)
  res.send(response);
};

export { handleError };