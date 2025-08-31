import Room from "../models/Room.js";

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    /**
     * Player joins a room after successful API call.
     * The client should emit this event with the roomId and the player's MongoDB _id.
     */
    socket.on("joinRoom", async ({ roomId, playerId }) => {
      try {
        const room = await Room.findOne({ roomId });
        if (!room) {
          socket.emit("error", { message: "Room not found." });
          return;
        }

        const player = room.players.id(playerId);
        if (!player) {
          socket.emit("error", { message: "Player not found in this room." });
          return;
        }

        // Associate socket ID with player for direct messaging
        player.socketId = socket.id;
        await room.save();

        // Join the socket.io room for broadcasting
        socket.join(roomId);

        console.log(
          `Player ${player.name} (${socket.id}) joined room ${roomId}`
        );

        // Send the full, current game state to the player who just joined
        socket.emit("gameState", room);

        // Notify all other players in the room that a new player has joined
        socket.to(roomId).emit("playerJoined", player);
      } catch (error) {
        console.error("Error in joinRoom event:", error);
        socket.emit("error", { message: "Server error while joining room." });
      }
    });

    // HANDLER FOR PAYING RENT/BANK
    socket.on("transaction", async ({ roomId, fromPlayerId, to, amount }) => {
      try {
        const room = await Room.findOne({ roomId });
        if (!room) return socket.emit("error", { message: "Room not found." });

        const payer = room.players.id(fromPlayerId);

        // Validation
        if (!payer || payer.wallet < amount) {
          return socket.emit("error", {
            message: "Invalid transaction or insufficient funds.",
          });
        }

        payer.wallet -= amount;

        const updatedWallets = [{ playerId: payer._id, wallet: payer.wallet }];

        if (to.type === "player") {
          const receiver = room.players.id(to.id);
          if (receiver) {
            receiver.wallet += amount;
            updatedWallets.push({
              playerId: receiver._id,
              wallet: receiver.wallet,
            });
          }
        }
        // If 'to.type' is 'bank', the money just vanishes from the payer's wallet.

        await room.save();

        // Broadcast the wallet updates to everyone in the room
        io.to(roomId).emit("walletsUpdated", updatedWallets);
      } catch (error) {
        console.error("Error during transaction:", error);
        socket.emit("error", { message: "Server error during transaction." });
      }
    });

    // HANDLER FOR BUYING PROPERTY
    socket.on("buyProperty", async ({ roomId, playerId, propertyId }) => {
      try {
        const room = await Room.findOne({ roomId });
        if (!room) return socket.emit("error", { message: "Room not found." });

        const player = room.players.id(playerId);
        const property = room.properties.id(propertyId);

        // Validation
        if (
          !player ||
          !property ||
          property.owner ||
          player.wallet < property.price
        ) {
          return socket.emit("error", {
            message:
              "Cannot buy property. It may be owned or you have insufficient funds.",
          });
        }

        // Perform the transaction
        player.wallet -= property.price;
        property.owner = playerId;

        await room.save();

        // Broadcast the updates to everyone in the room
        const updateData = {
          property: { propertyId: property._id, ownerId: player._id },
          player: { playerId: player._id, wallet: player.wallet },
        };
        io.to(roomId).emit("propertyBought", updateData);
      } catch (error) {
        console.error("Error buying property:", error);
        socket.emit("error", {
          message: "Server error while buying property.",
        });
      }
    });

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.id}`);
      try {
        // Find which room and player this socket belonged to
        const room = await Room.findOne({ "players.socketId": socket.id });
        if (room) {
          const player = room.players.find((p) => p.socketId === socket.id);
          if (player) {
            // For now, we just notify others. You can add logic to remove them.
            console.log(`Player ${player.name} left room ${room.roomId}`);
            io.to(room.roomId).emit("playerDisconnected", {
              playerId: player._id,
              name: player.name,
            });

            // Optional: Clear their socketId from the database
            player.socketId = undefined;
            await room.save();
          }
        }
      } catch (error) {
        console.error("Error handling disconnect:", error);
      }
    });
  });
};

export default initializeSocket;
