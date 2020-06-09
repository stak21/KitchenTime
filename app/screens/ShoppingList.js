import React, { Component } from "react";
import styled from "styled-components/native";
import {
  Text,
  View,
  Platform,
  StatusBar,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntIcon from "react-native-vector-icons/AntDesign";
import { TextInput } from "react-native-gesture-handler";

const dataList = [
  "frogs",
  "chicken",
  "duck",
  "lime",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
];
class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      currentText: "",
    };
  }

  handlePlusButton(target) {
    dataList.push(this.state.currentText);

    this.setState({
      currentText: "",
    });
  }

  render() {
    const { currentText } = this.state;

    return (
      <Container>
        <TitleContainer>
          <TitleText>Shopping List</TitleText>
        </TitleContainer>
        <SearchbarContainer>
          <SearchBarTextArea>
            <Icon name="search" style={{ fontSize: 24 }} />
            <StyledTextInput
              placeholder="Search"
              onChangeText={(currentText) => this.setState({ currentText })}
              value={currentText}
            />
          </SearchBarTextArea>
          <SearchBarPlusButton onPress={this.handlePlusButton.bind(this)}>
            <AntIcon name="pluscircleo" style={{ fontSize: 24 }} />
          </SearchBarPlusButton>
        </SearchbarContainer>
        <StyledFlatList
          data={dataList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ListItem>{item}</ListItem>}
        />
        <Button title="Add To Pantry" />
      </Container>
    );
  }
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
`;

const FlexContainer = styled.View``;

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

const StyledFlatList = styled.FlatList`
  background-color: white;
`;

const ListItem = styled.Text`
  padding: 20px;
  font-size: 20px;
  border: 1px solid black;
`;

const TitleContainer = styled.View`
  align-items: center;
  margin: 25px;
`;
const TitleText = styled.Text`
  color: palevioletred;
`;

export default ShoppingList;
