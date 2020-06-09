import React, { Component } from "react";
import styled from "styled-components/native";
import { AsyncStorage, Platform, StatusBar, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntIcon from "react-native-vector-icons/AntDesign";
import { TextInput } from "react-native-gesture-handler";

const key = "SHOPPING_LIST";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
      currentText: "",
    };
  }

  componentWillMount() {
    this.load();
  }

  load = async () => {
    await AsyncStorage.getItem(key)
      .then((req) => JSON.parse(req))
      .then((shoppingList) => {
        console.log(shoppingList);
        this.setState({ shoppingList });
      })
      .catch((error) => console.log("Failed to load shopping list."));
  };

  async handlePlusButton() {
    const { shoppingList, currentText } = this.state;

    if (currentText === "") {
      return;
    }

    const newStore = [currentText, ...shoppingList];

    await AsyncStorage.setItem(key, JSON.stringify(newStore))
      .then(() => {
        this.setState((prevState) => {
          return {
            shoppingList: newStore,
            currentText: "",
          };
        });
      })
      .catch((err) => console.error(err));
  }

  async handleToPantry() {
    // remove all selected items
    // remove select items from shoppingListStore
    // send it to pantryStore
  }

  render() {
    const { currentText, shoppingList } = this.state;

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
          data={shoppingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ListItem>{item}</ListItem>}
        />
        <Button
          title="Add To Pantry"
          onPress={this.handleToPantry.bind(this)}
        />
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
