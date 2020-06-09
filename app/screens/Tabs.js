import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import Pantry from "./Pantry";
import ShoppingList from "./ShoppingList";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Pantry") {
            iconName = "archive";
          } else if (route.name === "Shopping List") {
            iconName = "list";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Shopping List" component={ShoppingList} />
      <Tab.Screen name="Pantry" component={Pantry} />
    </Tab.Navigator>
  );
};

export default Tabs;
