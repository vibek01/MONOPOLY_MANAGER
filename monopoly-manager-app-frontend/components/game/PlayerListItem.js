// components/game/PlayerListItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { User, DollarSign } from "lucide-react-native";

const PlayerListItem = ({ player, isYou }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <User color={isYou ? COLORS.primary : COLORS.white} size={20} />
        <Text style={[styles.name, isYou && styles.yourName]}>
          {player.name} {isYou && "(You)"}
        </Text>
      </View>
      <View style={styles.walletContainer}>
        <DollarSign color={COLORS.accent} size={20} />
        <Text style={styles.wallet}>{player.wallet}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.base * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    ...FONTS.h4,
    color: COLORS.white,
    marginLeft: SIZES.base,
  },
  yourName: {
    color: COLORS.primary,
  },
  walletContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(140, 233, 154, 0.1)",
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius / 2,
  },
  wallet: {
    ...FONTS.h4,
    color: COLORS.accent,
    marginLeft: SIZES.base,
  },
});

export default PlayerListItem;
