import React, { Component } from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntIcon from "react-native-vector-icons/AntDesign";
import { TextInput } from "react-native-gesture-handler";

const Searchbar = ({ currentText, handlePlusButton, handleChangeText }) => (
  <SearchbarContainer>
    <SearchBarTextArea>
      <Icon name="search" style={{ fontSize: 24 }} />
      <StyledTextInput
        placeholder="Search"
        onChangeText={handleChangeText}
        value={currentText}
      />
    </SearchBarTextArea>
    <SearchBarPlusButton onPress={handlePlusButton}>
      <AntIcon name="pluscircleo" style={{ fontSize: 24 }} />
    </SearchBarPlusButton>
  </SearchbarContainer>
);

export default Searchbar;

const SearchbarContainer = styled.View`
  background-color: orange;
  height: 80px;
  justify-content: center;
  padding-horizontal: 5px;
  flex-direction: row;
  align-items: center;
`;

const SearchBarTextArea = styled.View`
  height: 50px;
  background-color: white;
  flex-direction: row;
  padding: 5px;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const SearchBarPlusButton = styled.TouchableOpacity`
  margin: 10px;
`;

const StyledTextInput = styled.TextInput`
  font-size: 24px;
  width: 100%;
`;
