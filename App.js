import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGame from "./components/screens/StartGame";
import GameScreen from "./components/screens/Game";
import GameOver from "./components/screens/GameOver";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded)
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={err => console.log(err)} />
    );

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const playAgainHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let screen = <StartGame onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) screen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  else if (guessRounds > 0)
    screen = <GameOver rounds={guessRounds} userNumber={userNumber} playAgain={playAgainHandler} />;

  screen = <GameOver rounds={1} userNumber={1} playAgain={playAgainHandler} />;
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
