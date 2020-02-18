import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import Card from "../Card";
import Colors from "../../constants/colors";

const StartGame = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <TextInput />
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
  }
});

export default StartGame;
