import React from "react";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";

const ShoppingList = (props) => {
  return (
    <View style={styles.container}>
      <Text>Pantry</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ShoppingList;
