import React from "react";
import { StyleSheet, View, Text } from "react-native";

const GameOver = () => {
  return (
    <View style={styles.screen}>
      <Text>The game is over!!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default GameOver;
