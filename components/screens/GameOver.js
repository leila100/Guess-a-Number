import React from "react";
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from "react-native";

import BodyText from "../BodyText";
import TitleText from "../TitleText";
import Colors from "../../constants/colors";
import MainButton from "../MainButton";

const GameOver = props => {
  return (
    <ScrollView>
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
    </ScrollView>
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
    height: Dimensions.get("window").width * 0.7,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold"
  },
  resultContainer: {
    width: "80%",
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").width < 350 ? 16 : 20
  }
});

export default GameOver;
