import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  wallet: { type: Number, default: 1500 },
  socketId: { type: String }, // To directly communicate with a player
});

// We don't compile this as a standalone model.
// It will be used as a sub-document within the Room schema.
export default playerSchema;
