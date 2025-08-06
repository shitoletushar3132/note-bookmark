export const sendSuccess = (res, data = {}, message = "", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const sendError = (
  res,
  statusCode = 500,
  message = "Something went wrong",
  data = {}
) => {
  res.status(statusCode).json({
    success: false,
    message,
    data,
  });
};
