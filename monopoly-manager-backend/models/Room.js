import mongoose from "mongoose";
import playerSchema from "./Player.js";
import propertySchema from "./Property.js";

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    players: [playerSchema],
    properties: [propertySchema],
    host: {
      // Store the session ID of the host to handle reconnections or host-specific actions
      type: String,
    },
    status: {
      type: String,
      enum: ["waiting", "in-progress", "finished"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
