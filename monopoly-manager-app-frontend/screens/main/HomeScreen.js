// screens/main/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput, // <-- We are using the standard, built-in TextInput
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import Container from "../../components/layout/Container";
import CustomButton from "../../components/common/Button";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { createRoom, joinRoom } from "../../api/roomApi";
import { useGame } from "../../contexts/GameContext";
import { Zap, LogIn } from "lucide-react-native";

const HomeScreen = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { initializeGame } = useGame();

  const handleCreateRoom = async () => {
    if (!playerName.trim()) {
      Alert.alert("Validation Error", "Please enter your name.");
      return;
    }
    setIsLoading(true);
    try {
      const { player, roomId: newRoomId } = await createRoom(playerName);
      initializeGame(player, newRoomId);
      navigation.replace("Dashboard");
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

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Monopoly</Text>
            <Text style={styles.subtitle}>Manager</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name"
              placeholderTextColor={COLORS.textMuted}
              value={playerName}
              onChangeText={setPlayerName}
              selectionColor={COLORS.primary}
            />

            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={{ marginVertical: 20 }}
              />
            ) : (
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

                <TextInput
                  style={styles.input}
                  placeholder="Enter Room Code"
                  placeholderTextColor={COLORS.textMuted}
                  value={roomId}
                  onChangeText={setRoomId}
                  autoCapitalize="characters"
                  selectionColor={COLORS.primary}
                />

                <CustomButton
                  title="Join Room"
                  onPress={handleJoinRoom}
                  variant="secondary"
                  icon={<LogIn color={COLORS.white} size={20} />}
                  disabled={!playerName.trim() || !roomId.trim()}
                />
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: SIZES.padding * 2,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.white,
  },
  subtitle: {
    ...FONTS.h3,
    color: COLORS.textMuted,
  },
  formContainer: {
    width: "100%",
  },
  // This is the new, simple style for the built-in TextInput
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    height: 50,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    color: COLORS.white,
    ...FONTS.body,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
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
