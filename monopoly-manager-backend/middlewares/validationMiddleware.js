import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    const validationErrors = err.errors.map((e) => e.message);
    next(new ApiError(400, "Validation failed", validationErrors));
  }
};

export default validate;
