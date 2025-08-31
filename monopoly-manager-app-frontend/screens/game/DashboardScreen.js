// screens/game/DashboardScreen.js
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Container from "../../components/layout/Container";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useGame } from "../../contexts/GameContext";
import { SocketContext } from "../../contexts/SocketContext";
import { LogOut } from "lucide-react-native";
import GlassContainer from "../../components/layout/GlassContainer";
import PlayerListItem from "../../components/game/PlayerListItem";

const DashboardScreen = ({ navigation }) => {
  const { player, roomId, gameState, setGameState } = useGame();
  const socket = useContext(SocketContext);

  // This effect runs when the component mounts
  useEffect(() => {
    if (socket && player && roomId) {
      // 1. Tell the server this socket connection belongs to this player in this room
      socket.emit("joinRoom", { roomId, playerId: player._id });

      // 2. Listen for the initial game state from the server
      socket.on("gameState", (data) => {
        setGameState(data);
      });

      // 3. Listen for when a new player joins
      socket.on("playerJoined", (newPlayer) => {
        setGameState((prevState) => ({
          ...prevState,
          players: [...prevState.players, newPlayer],
        }));
      });

      // 4. Listen for when a player disconnects
      socket.on("playerDisconnected", ({ playerId }) => {
        setGameState((prevState) => ({
          ...prevState,
          players: prevState.players.filter((p) => p._id !== playerId),
        }));
      });
    }

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      if (socket) {
        socket.off("gameState");
        socket.off("playerJoined");
        socket.off("playerDisconnected");
      }
    };
  }, [socket, player, roomId]); // Rerun if these values change

  const handleLeaveRoom = () => {
    Alert.alert("Leave Room", "Are you sure you want to leave the game?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave",
        style: "destructive",
        onPress: () => navigation.popToTop(), // Go back to the very first screen (HomeScreen)
      },
    ]);
  };

  return (
    <Container>
      <View style={styles.header}>
        <View>
          <Text style={styles.roomCodeLabel}>ROOM CODE</Text>
          <Text style={styles.roomCode}>{roomId}</Text>
        </View>
        <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveRoom}>
          <LogOut color={COLORS.secondary} size={24} />
        </TouchableOpacity>
      </View>

      <GlassContainer style={{ flex: 1 }}>
        <Text style={styles.listHeader}>Players</Text>
        <FlatList
          data={gameState?.players || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PlayerListItem player={item} isYou={item._id === player?._id} />
          )}
        />
      </GlassContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  roomCodeLabel: {
    ...FONTS.body,
    color: COLORS.textMuted,
  },
  roomCode: {
    ...FONTS.h2,
    color: COLORS.primary,
    letterSpacing: 2,
  },
  leaveButton: {
    padding: SIZES.base,
    backgroundColor: COLORS.glass,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  listHeader: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: SIZES.base,
    paddingBottom: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
  },
});

export default DashboardScreen;
