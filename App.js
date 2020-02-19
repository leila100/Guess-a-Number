import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Header";
import StartGame from "./components/screens/StartGame";
import GameScreen from "./components/screens/GameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  let screen = <StartGame onStartGame={startGameHandler} />;

  if (userNumber) screen = <GameScreen userChoice={userNumber} />;

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
