import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import BodyText from "../BodyText";
import TitleText from "../TitleText";

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over!!!!</TitleText>
      <View style={styles.imageContainer}>
        {/* <Image source={require("../../assets/success.png")} style={styles.image} /> */}
        <Image
          source={{
            uri:
              "https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/alt-597f43cca08a4-4012-4a67efa4a1926905348cbc133634f7ff@1x.jpg"
          }}
          style={styles.image}
        />
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
  }
});

export default GameOver;
