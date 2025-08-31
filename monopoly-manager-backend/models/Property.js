import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rent: { type: [Number], required: true }, // Array for different rent levels
  color: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Player", default: null },
});
// We don't compile this as a standalone model.
// It will be used as a sub-document within the Room schema.
export default propertySchema;
