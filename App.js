import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./app/screens/Tabs";
import { MyTheme } from "./app/config/colors";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        <Tabs />
      </NavigationContainer>
    );
  }
}

export default App;
