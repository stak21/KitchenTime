import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";

import Pantry from "./app/screens/Pantry";
import ShoppingList from "./app/screens/ShoppingList";
import Tabs from "./app/screens/Tabs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: "pantry",
    };
  }

  render() {
    const { activeScreen } = this.state;
    console.log(activeScreen);
    return (
      <View style={styles.container}>
        {activeScreen === "shoppingList" ? <ShoppingList /> : <Pantry />}
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;
