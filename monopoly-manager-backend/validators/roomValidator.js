import { z } from "zod";

export const createRoomSchema = z.object({
  body: z.object({
    playerName: z
      .string({ required_error: "Player name is required" })
      .min(2, "Player name must be at least 2 characters long")
      .max(20, "Player name cannot exceed 20 characters"),
  }),
});

export const joinRoomSchema = z.object({
  body: z.object({
    playerName: z
      .string({ required_error: "Player name is required" })
      .min(2, "Player name must be at least 2 characters long")
      .max(20, "Player name cannot exceed 20 characters"),
    roomId: z
      .string({ required_error: "Room ID is required" })
      .regex(/^[A-Z]{4}-[0-9]{4}$/, "Invalid Room ID format"),
  }),
});
