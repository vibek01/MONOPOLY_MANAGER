import Room from "../models/Room.js";
import ApiError from "../utils/ApiError.js";
import { initialProperties } from "../constants/properties.js"; // We will create this file next

// A simple utility to generate a unique room ID
const generateRoomId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  let charPart = "";
  let numPart = "";
  for (let i = 0; i < 4; i++) {
    charPart += chars.charAt(Math.floor(Math.random() * chars.length));
    numPart += nums.charAt(Math.floor(Math.random() * nums.length));
  }
  return `${charPart}-${numPart}`;
};

export const createRoom = async (hostName) => {
  let roomId = generateRoomId();
  let roomExists = await Room.findOne({ roomId });

  // Ensure roomId is unique
  while (roomExists) {
    roomId = generateRoomId();
    roomExists = await Room.findOne({ roomId });
  }

  const host = { name: hostName, wallet: 1500 };

  const newRoom = new Room({
    roomId,
    players: [host],
    properties: initialProperties,
    host: hostName, // Temporarily use name, will be updated with socketId
  });

  await newRoom.save();

  // Return only the necessary data to the controller
  const hostData = newRoom.players[0];
  return { room: newRoom, host: hostData };
};

export const joinRoom = async (roomId, playerName) => {
  const room = await Room.findOne({ roomId });

  if (!room) {
    throw new ApiError(404, "Room not found.");
  }

  if (
    room.players.find((p) => p.name.toLowerCase() === playerName.toLowerCase())
  ) {
    throw new ApiError(409, "Player name is already taken in this room.");
  }

  // In a real app, you might check if the game is full or already started
  // if (room.status !== 'waiting') {
  //     throw new ApiError(403, 'Game is already in progress.');
  // }

  const newPlayer = { name: playerName, wallet: 1500 };
  room.players.push(newPlayer);
  await room.save();

  // Return the specific player object that was just added
  const playerData = room.players[room.players.length - 1];
  return { room, player: playerData };
};
