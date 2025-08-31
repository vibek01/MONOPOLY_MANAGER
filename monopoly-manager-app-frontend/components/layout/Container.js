// components/layout/Container.js
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../../constants/theme";

const Container = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: 24,
  },
});

export default Container;
