import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import BodyText from "../BodyText";
import TitleText from "../TitleText";

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over!!!!</TitleText>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/success.png")} style={styles.image} />
      </View>
      <BodyText>Number of rounds: {props.rounds}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <Button title='Play again' onPress={props.playAgain} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageContainer: {
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30
  }
});

export default GameOver;
