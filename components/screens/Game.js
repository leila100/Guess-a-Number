import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Alert, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenOrientation } from "expo";

import NumberContainer from "../NumberContainer";
import Card from "../Card";
import defaultStyles from "../../constants/dafaultStyles";
import MainButton from "../MainButton";
import BodyText from "../BodyText";

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
};

const generateRandomNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // generate random number between min and max
  const rdm = Math.floor(Math.random() * (max - min)) + min;
  if (rdm === exclude) return generateRandomNum(min, max, exclude);
  else return rdm;
};

const GameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  const initialGuess = generateRandomNum(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height);
  const currentLow = useRef(1);
  const currentHigh = useRef(99);

  const { userChoice, onGameOver } = props;

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

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1;
    }
    const nextGuess = generateRandomNum(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextGuess);
    setPastGuesses(prevGuesses => [nextGuess.toString(), ...prevGuesses]);
  };

  let listContainerStyle = styles.listContainer;
  if (deviceWidth < 350) listContainerStyle = styles.listContainerBig;

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.titleText}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler("greater")}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.titleText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={{ ...styles.buttonContainer, marginTop: deviceHeight > 600 ? 20 : 10 }}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("greater")}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
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
    width: 400,
    maxWidth: "90%"
  },

  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  listContainer: {
    flex: 1,
    width: "60%"
  },
  listContainerBig: {
    flex: 1,
    width: "80%"
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%"
  }
});

export default GameScreen;
