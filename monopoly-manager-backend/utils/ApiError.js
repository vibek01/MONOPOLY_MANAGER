class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    // TODO: Add logging for production environments (e.g., Sentry, Winston)
  }
}

export default ApiError;
