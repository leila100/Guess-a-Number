import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";

import NumberContainer from "../NumberContainer";
import Card from "../Card";

const generateRandomNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // generate random number between min and max
  const rdm = Math.floor(Math.random() * (max - min)) + min;
  if (rdm === exclude) generateRandomNum(min, max, exclude);
  else return rdm;
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomNum(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(99);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "Please do not cheat!", [{ text: "sorry!", style: "cancel" }]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else if (direction === "greater") {
      currentLow.current = currentGuess;
    }
    const nextGuess = generateRandomNum(currentLow.current, currentHigh.current + 1, currentGuess);
    setCurrentGuess(nextGuess);
    setRounds(prevRounds => prevRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='LOWER' onPress={() => nextGuessHandler("lower")} />
        <Button title='GREATER' onPress={() => nextGuessHandler("greater")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameScreen;
