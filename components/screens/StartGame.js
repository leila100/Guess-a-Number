import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import Card from "../Card";
import Input from "../Input";
import NumberContainer from "../NumberContainer";
import Colors from "../../constants/colors";
import BodyText from "../BodyText";
import TitleText from "../TitleText";
import MainButton from "../MainButton";

const StartGame = props => {
  const [inputVal, setInputVal] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");

  const inputHandler = inputText => {
    setInputVal(inputText.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setInputVal("");
    setConfirmed(false);
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(inputVal);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Wrong number!", "Number has to be a number between 1 and 99.", [
        { text: "OK", style: "destructive", onPress: resetHandler }
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setInputVal("");
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmCard}>
        <TitleText>You selected</TitleText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}> START GAME </MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={inputHandler}
            value={inputVal}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button title='Reset' onPress={resetHandler} color={Colors.secondary} />
            </View>
            <View style={styles.button}>
              <Button title='Confirm' onPress={confirmHandler} color={Colors.primary} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  button: {
    width: 100,
    maxWidth: "40%",
    margin: 0
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  confirmCard: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartGame;
