// screens/main/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import Container from "../../components/layout/Container";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { Zap, LogIn } from "lucide-react-native";
import CustomButton from "../../components/common/Button";
import CustomTextInput from "../../components/common/TextInput";

// Import our new services and context
import { createRoom, joinRoom } from "../../api/roomApi";
// import { useGame } from "../../contexts/GameContext";
import { useGame } from '../../contexts/GameContext'

const HomeScreen = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { initializeGame } = useGame(); // Get the function from our context

  const handleCreateRoom = async () => {
    if (!playerName.trim()) {
      Alert.alert("Validation Error", "Please enter your name.");
      return;
    }
    setIsLoading(true);
    try {
      const { player, roomId: newRoomId } = await createRoom(playerName);
      initializeGame(player, newRoomId);
      navigation.replace("Dashboard"); // Use 'replace' so user can't go back to home screen
    } catch (error) {
      Alert.alert("Error Creating Room", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!playerName.trim() || !roomId.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter your name and a room code."
      );
      return;
    }
    setIsLoading(true);
    try {
      const { player, roomId: existingRoomId } = await joinRoom(
        playerName,
        roomId.toUpperCase()
      );
      initializeGame(player, existingRoomId);
      navigation.replace("Dashboard");
    } catch (error) {
      Alert.alert("Error Joining Room", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If loading, show a spinner instead of the buttons
  const renderButtons = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={COLORS.primary} />;
    }
    return (
      <>
        <CustomButton
          title="Create New Room"
          onPress={handleCreateRoom}
          icon={<Zap color={COLORS.background} size={20} />}
          disabled={!playerName.trim()}
        />
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.line} />
        </View>
        <CustomTextInput
          placeholder="Enter Room Code"
          value={roomId}
          onChangeText={setRoomId}
          autoCapitalize="characters"
        />
        <CustomButton
          title="Join Room"
          onPress={handleJoinRoom}
          variant="secondary"
          icon={<LogIn color={COLORS.white} size={20} />}
          disabled={!playerName.trim() || !roomId.trim()}
        />
      </>
    );
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Monopoly</Text>
            <Text style={styles.subtitle}>Manager</Text>
          </View>

          <View style={styles.formContainer}>
            <CustomTextInput
              placeholder="Enter Your Name"
              value={playerName}
              onChangeText={setPlayerName}
            />
            {renderButtons()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

// Add/Update styles
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: SIZES.padding * 2,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.white,
    textShadowColor: COLORS.primary,
    textShadowRadius: 10,
  },
  subtitle: {
    ...FONTS.h3,
    color: COLORS.textMuted,
    marginTop: -SIZES.base,
  },
  formContainer: {
    width: "100%",
    paddingBottom: 20, // Add some padding at the bottom
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SIZES.padding,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.glassBorder,
  },
  dividerText: {
    ...FONTS.body,
    color: COLORS.textMuted,
    marginHorizontal: SIZES.base,
  },
});

export default HomeScreen;
