// screens/game/DashboardScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Container from "../../components/layout/Container";
import { COLORS, FONTS } from "../../constants/theme";
import { useGame } from "../../contexts/GameContext"; // Import the hook

const DashboardScreen = () => {
  // Get the player and roomId from our global state
  const { player, roomId } = useGame();

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Game Dashboard</Text>
        <Text style={styles.roomId}>Room Code: {roomId}</Text>
        <Text style={styles.playerName}>Welcome, {player?.name}!</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  roomId: {
    ...FONTS.h4,
    color: COLORS.primary,
    marginTop: 5,
  },
  playerName: {
    ...FONTS.body,
    color: COLORS.textMuted,
    marginTop: 10,
  },
});

export default DashboardScreen;
