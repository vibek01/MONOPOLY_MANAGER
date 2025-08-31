import ApiError from "../utils/ApiError.js";

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  }

  // Log the unexpected error for debugging
  console.error(err);

  // Send a generic 500 Internal Server Error response for unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message],
  });
};

export { globalErrorHandler };
