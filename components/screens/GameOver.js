import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import BodyText from "../BodyText";
import TitleText from "../TitleText";
import Colors from "../../constants/colors";
import MainButton from "../MainButton";

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over!!!!</TitleText>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/success.png")} style={styles.image} />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.playAgain}>Play again </MainButton>
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
    height: "100%",
    resizeMode: "cover"
  },
  imageContainer: {
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold"
  },
  resultContainer: {
    width: "80%",
    marginHorizontal: 30,
    marginVertical: 15
  },
  resultText: {
    textAlign: "center",
    fontSize: 20
  }
});

export default GameOver;
