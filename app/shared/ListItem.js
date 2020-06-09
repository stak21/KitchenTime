import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const ListItem = ({ item, handleRemoveItem }) => (
  <ItemContainer>
    <ItemText>{item}</ItemText>
    <TouchableOpacity onPress={() => handleRemoveItem(item)}>
      <WarningText>X</WarningText>
    </TouchableOpacity>
  </ItemContainer>
);

export default ListItem;

const ItemText = styled.Text`
  font-size: 20px;
`;

const ItemContainer = styled.View`
  padding: 20px;
  border: 1px solid black;
  flex-direction: row;
  justify-content: space-between;
`;

const WarningText = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 900;
  background: #e54b4b;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  padding: 0px 5px;
`;
