import React, { Component } from "react";
import styled from "styled-components";
import { AsyncStorage, Platform, StatusBar, Button } from "react-native";

import Searchbar from "../shared/Searchbar";
import ListItem from "../shared/ListItem";

const key = "PANTRY_LIST";

class PantryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pantryList: [],
      currentText: "",
    };
  }

  componentWillMount() {
    this.load();
  }

  load = async () => {
    await AsyncStorage.getItem(key)
      .then((req) => JSON.parse(req))
      .then((pantryList) => {
        this.setState({ pantryList: pantryList || [] });
      })
      .catch((error) => console.log("Failed to load pantry."));
  };

  handleRemoveItem = async (item) => {
    console.log("hello", item);
    await AsyncStorage.getItem(key)
      .then((req) => JSON.parse(req))
      .then(async (pantryList) => {
        const newStore = pantryList.filter((ingredient) => ingredient != item);
        await AsyncStorage.setItem(key, JSON.stringify(newStore)).then(() => {
          this.setState({ pantryList: newStore || [] });
        });
      })
      .catch((err) => console.error(err));
  };

  handleChangeText = (currentText) => {
    this.setState({
      currentText,
    });
  };

  handlePlusButton = async () => {
    const { pantryList, currentText } = this.state;

    if (currentText === "") {
      return;
    }

    const newStore = [currentText, ...pantryList];

    await AsyncStorage.setItem(key, JSON.stringify(newStore))
      .then(() => {
        this.setState((prevState) => {
          return {
            pantryList: newStore,
            currentText: "",
          };
        });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { currentText, pantryList } = this.state;
    return (
      <Container>
        <TitleContainer>
          <TitleText>Pantry</TitleText>
        </TitleContainer>
        <Searchbar
          currentText={currentText}
          handlePlusButton={this.handlePlusButton}
          handleChangeText={this.handleChangeText}
        />
        <StyledFlatList
          data={pantryList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem item={item} handleRemoveItem={this.handleRemoveItem} />
          )}
        />
      </Container>
    );
  }
}

export default PantryList;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
`;

const FlexContainer = styled.View``;

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
