import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Header";
import StartGame from "./components/screens/StartGame";
import GameScreen from "./components/screens/Game";
import GameOver from "./components/screens/GameOver";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let screen = <StartGame onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) screen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  else if (guessRounds > 0) screen = <GameOver />;

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
