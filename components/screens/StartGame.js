import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard } from "react-native";

import Card from "../Card";
import Input from "../Input";
import Colors from "../../constants/colors";

const StartGame = () => {
  const [inputVal, setInputVal] = useState("");

  const inputHandler = inputText => {
    setInputVal(inputText.replace(/[^0-9]/g, ""));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
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
              <Button title='Reset' onPress={() => {}} color={Colors.secondary} />
            </View>
            <View style={styles.button}>
              <Button title='Confirm' onPress={() => {}} color={Colors.primary} />
            </View>
          </View>
        </Card>
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
    marginVertical: 10
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
  }
});

export default StartGame;
