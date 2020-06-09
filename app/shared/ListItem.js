import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components";

const ListItem = ({ item, handleRemoveItem }) => (
  <View>
    <ItemText>{item}</ItemText>
    <TouchableOpacity onPress={() => handleRemoveItem(item)}>
      <Text>Delete</Text>
    </TouchableOpacity>
  </View>
);

export default ListItem;

const ItemText = styled.Text`
  padding: 20px;
  font-size: 20px;
  border: 1px solid black;
`;
