import { sendError } from "../utils/sentResponse.js";

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  sendError(res, statusCode, err.message || "Internal Server Error");
};

export default errorHandler;
