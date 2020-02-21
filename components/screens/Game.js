import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../NumberContainer";
import Card from "../Card";
import defaultStyles from "../../constants/dafaultStyles";
import MainButton from "../MainButton";

const generateRandomNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // generate random number between min and max
  const rdm = Math.floor(Math.random() * (max - min)) + min;
  if (rdm === exclude) return generateRandomNum(min, max, exclude);
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
    const nextGuess = generateRandomNum(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextGuess);
    setRounds(prevRounds => prevRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.titleText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("greater")}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
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
    width: 400,
    maxWidth: "90%"
  }
});

export default GameScreen;
