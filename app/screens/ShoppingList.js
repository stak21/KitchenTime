import React, { Component } from "react";
import styled from "styled-components/native";
import { AsyncStorage, Platform, StatusBar, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntIcon from "react-native-vector-icons/AntDesign";
import { TextInput } from "react-native-gesture-handler";

import Searchbar from "../shared/Searchbar";
import ListItem from "../shared/ListItem";

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
        this.setState({ shoppingList: shoppingList || [] });
      })
      .catch((error) => console.log("Failed to load shopping list."));
  };

  handlePlusButton = async () => {
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
  };

  handleChangeText = (currentText) => {
    this.setState({
      currentText,
    });
  };

  handleRemoveItem = async (item) => {
    await AsyncStorage.getItem(key)
      .then((req) => JSON.parse(req))
      .then(async (shoppingList) => {
        const newStore = shoppingList.filter(
          (ingredient) => ingredient != item
        );
        await AsyncStorage.setItem(key, JSON.stringify(newStore)).then(() => {
          this.setState({ shoppingList: newStore || [] });
        });
      })
      .catch((err) => console.error(err));
  };

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
        <Searchbar
          currentText={currentText}
          handlePlusButton={this.handlePlusButton}
          handleChangeText={this.handleChangeText}
        />
        <StyledFlatList
          data={shoppingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem item={item} handleRemoveItem={this.handleRemoveItem} />
          )}
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

const TitleContainer = styled.View`
  align-items: center;
  margin: 25px;
`;
const TitleText = styled.Text`
  color: palevioletred;
`;

export default ShoppingList;
