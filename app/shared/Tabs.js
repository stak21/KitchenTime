import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";

import PantryList from "../screens/PantryList";
import ShoppingList from "../screens/ShoppingList";
import RecipesView from "../screens/RecipesView";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let type = "FA";

          if (route.name === "Pantry") {
            iconName = "archive";
          } else if (route.name === "Shopping List") {
            iconName = "list";
          } else if (route.name === "Recipes") {
            iconName = "bowl";
            type = "EY";
          }

          return type === "FA" ? (
            <Icon name={iconName} size={size} color={color} />
          ) : (
            <EntypoIcon name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Shopping List" component={ShoppingList} />
      <Tab.Screen name="Recipes" component={RecipesView} />
      <Tab.Screen name="Pantry" component={PantryList} />
    </Tab.Navigator>
  );
};

export default Tabs;
