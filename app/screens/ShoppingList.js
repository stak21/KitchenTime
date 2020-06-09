import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

const ShoppingList = (props) => {
  return (
    <View style={styles.container}>
      <Text>ShoppingList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default ShoppingList;
