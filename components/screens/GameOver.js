import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <Text>The game is over!!!!</Text>
      <Text>Number of rounds: {props.rounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title='Play again' onPress={props.playAgain} />
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
