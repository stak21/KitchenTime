import React from "react";
import styled from "styled-components/native";
import { Text, View, Platform, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native-gesture-handler";

const ShoppingList = (props) => {
  return (
    <Container>
      <TitleContainer>
        <TitleText>Shopping List</TitleText>
      </TitleContainer>
      <FlexContainer>
        <SearchbarContainer>
          <SearchBarTextArea>
            <Icon name="search" style={{ fontSize: 24 }} />
            <StyledTextInput placeholder="Search" />
          </SearchBarTextArea>
        </SearchbarContainer>
      </FlexContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
`;

const FlexContainer = styled.View`
  flex: 1;
`;

const SearchbarContainer = styled.View`
  background-color: orange;
  height: 80px;
  justify-content: center;
  padding-horizontal: 5px;
`;

const SearchBarTextArea = styled.View`
  height: 50px;
  background-color: white;
  flex-direction: row;
  padding: 5px;
  align-items: center;
`;

const StyledTextInput = styled.TextInput`
  font-size: 24px;
  margin-left: 15px;
  width: 100%;
`;

const TitleContainer = styled.View`
  align-items: center;
  margin: 25px;
`;
const TitleText = styled.Text`
  color: palevioletred;
`;

export default ShoppingList;
