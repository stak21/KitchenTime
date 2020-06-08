import React from "react";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Tabs = (props) => {
  return (
    <View style={styles.navbar}>
      <View style={styles.navTab}>
        <Image source={require("../../assets/icon.png")}></Image>
      </View>
      <View style={styles.navTab}>
        <Image source={require("../../assets/icon.png")}></Image>
      </View>
      <View style={styles.navTab}>
        <Image source={require("../../assets/icon.png")}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 75,
    backgroundColor: "grey",
    flexDirection: "row",
  },
  navTab: {
    flex: 1,
  },
});

export default Tabs;
