import React, { Component } from "react";
import styled from "styled-components";
import { AsyncStorage, Platform, StatusBar, Button } from "react-native";

import Searchbar from "../shared/Searchbar";

const dataList = ["Japanse Curry", "Yakisoba"];

class RecipesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: "",
    };
  }

  render() {
    const { currentText } = this.state;

    return (
      <Container>
        <TitleContainer>
          <TitleText>Recipes</TitleText>
        </TitleContainer>
        <Searchbar
          currentText={currentText}
          handleChangeText={this.handleChangeText}
          buttonEnabled={false}
        />
        <StyledFlatList
          data={dataList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ListItem>{item}</ListItem>}
        />
      </Container>
    );
  }
}
export default RecipesView;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
`;

const TitleContainer = styled.View`
  align-items: center;
  margin: 25px;
`;
const TitleText = styled.Text`
  color: palevioletred;
`;

const StyledFlatList = styled.FlatList`
  background-color: rgb(161, 186, 114);
`;

const ListItem = styled.Text`
  padding: 20px;
  background-color: rgb(242, 202, 68);
`;
