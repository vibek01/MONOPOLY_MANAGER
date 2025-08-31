import { createRoom, joinRoom } from "../services/roomService.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

export const handleCreateRoom = asyncErrorHandler(async (req, res) => {
  const { playerName } = req.body;
  const { room, host } = await createRoom(playerName);

  res.status(201).json({
    success: true,
    message: "Room created successfully",
    data: {
      roomId: room.roomId,
      player: host,
    },
  });
});

export const handleJoinRoom = asyncErrorHandler(async (req, res) => {
  const { roomId, playerName } = req.body;
  const { room, player } = await joinRoom(roomId, playerName);

  res.status(200).json({
    success: true,
    message: "Joined room successfully",
    data: {
      roomId: room.roomId,
      player: player,
    },
  });
});
