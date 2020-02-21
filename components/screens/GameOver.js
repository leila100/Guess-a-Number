import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from "react-native";

import BodyText from "../BodyText";
import TitleText from "../TitleText";
import Colors from "../../constants/colors";
import MainButton from "../MainButton";

const GameOver = props => {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get("window").width);
      setDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over!!!!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            width: deviceWidth * 0.7,
            height: deviceWidth * 0.7,
            borderRadius: (deviceWidth * 0.7) / 2,
            marginVertical: deviceHeight / 30
          }}
        >
          <Image source={require("../../assets/success.png")} style={styles.image} />
        </View>
        <View style={{ ...styles.resultContainer, marginVertical: deviceHeight / 60 }}>
          <BodyText style={{ ...styles.resultText, fontSize: deviceWidth < 350 ? 16 : 20 }}>
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
    alignItems: "center",
    paddingVertical: 10
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden"
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold"
  },
  resultContainer: {
    width: "80%",
    marginHorizontal: 30
  },
  resultText: {
    textAlign: "center"
  }
});

export default GameOver;
