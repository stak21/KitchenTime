import React, { Component, useEffect } from "react";
import styled from "styled-components/native";
import { AsyncStorage, Platform, StatusBar } from "react-native";

import Searchbar from "../shared/Searchbar";
import RecipeItem from "./Recipes/RecipeItem";

const dataList = [
  { title: "Japanse Curry", availableIngredients: 5, totalIngredients: 10 },
  { title: "Yakisoba", availableIngredients: 2, totalIngredients: 4 },
];
const key = "PANTRY_LIST";

class RecipesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: "",
      recipes: [],
      pantryList: [],
    };
  }

  async componentWillMount() {
    this.loadPantry();
  }

  loadPantry = async () => {
    await AsyncStorage.getItem(key)
      .then((req) => JSON.parse(req))
      .then((pantryList) => {
        this.setState({ pantryList: pantryList || [] });
        this.loadRecipes();
      })
      .catch((error) => console.log("Failed to load pantry."));
  };

  loadRecipes = async () => {
    const { pantryList } = this.state;
    const ingredients = pantryList.join(",");
    await fetch(
      `http://192.168.0.11:8080/api/recipes?ingredients=${ingredients}`
    )
      .then((res) => res.json())
      .then(async (results) => {
        const recipes = await this.extractRecipes(results);
        this.setState({ recipes });
      })
      .catch((error) => console.error(error));
  };

  extractIngredients = (ingredients) => {
    return ingredients.map((ingredient) => {
      return {
        name: ingredient.name,
        isChecked: false,
      };
    });
  };

  extractRecipes = (recipes) => {
    const { pantryList } = this.state;

    const extractedRecipes = recipes.map((recipe, index) => {
      return {
        missingIngredients: this.extractIngredients(recipe.missedIngredients),
        usedIngredients: this.extractIngredients(recipe.usedIngredients),
        totalIngredientsCount:
          recipe.missedIngredients.length + recipe.usedIngredients.length,
        title: recipe.title,
        instructions: "",
      };
    });
    console.log("recipe extracted: ", extractedRecipes);
    return extractedRecipes;
  };

  render() {
    const { currentText, recipes, expanded } = this.state;
    console.log("length", this.state);

    return (
      <Container>
        <TitleContainer>
          <TitleText>Recipes</TitleText>
        </TitleContainer>
        <Searchbar
          currentText={currentText}
          handleChangeText={this.handleChangeText}
          handlePlusButton={this.loadPantry}
        />
        {recipes.length > 0 ? (
          <StyledFlatList
            data={recipes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <RecipeItem item={item} />}
          />
        ) : null}
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
