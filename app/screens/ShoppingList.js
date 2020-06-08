import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

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
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShoppingList;
