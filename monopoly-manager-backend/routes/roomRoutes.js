import express from "express";
import {
  handleCreateRoom,
  handleJoinRoom,
} from "../controllers/roomController.js";
import validate from "../middlewares/validationMiddleware.js";
import {
  createRoomSchema,
  joinRoomSchema,
} from "../validators/roomValidator.js";

const router = express.Router();

router.post("/create", validate(createRoomSchema), handleCreateRoom);
router.post("/join", validate(joinRoomSchema), handleJoinRoom);

export default router;
