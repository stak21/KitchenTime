import React, { Component } from "react";
import {
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components/native";

import DescriptionItem from "./DescriptionItem";

class RecipeItem extends Component {
  constructor(props) {
    console.log("props", props);
    super(props);

    this.state = {
      expanded: false,
      descriptionExpanded: false,
      selectedRecipe: null,
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  searchRecipeByName = async () => {
    const { item } = this.props;

    await fetch(`http://192.168.0.11:8080/api/recipe?q=${item.title}`)
      .then((res) => res.json())
      .then(async (res1) => {
        if (!res1) {
          return;
        }

        console.log(res1.sourceUrl);
        await fetch(
          `http://192.168.0.11:8080/api/recipe/url?url=${res1.sourceUrl}`
        )
          .then((res) => res.json())
          .then(async (res2) => {
            if (!res2) {
              return;
            }

            console.log(res2);
            const recipe = {
              title: res1.title,
              preparationMinutes: res2.preparationMinutes,
              readyInMinutes: res1.readyInMinutes,
              servings: res1.servings,
              sourceUrl: res1.sourceUrl,
              image: res1.image,
              instructions: res2.instructions,
            };

            this.setState({
              selectedRecipe: recipe,
            });
          });
      })
      .catch((error) => console.error(error));
  };

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
    this.searchRecipeByName();
  };

  changeDescriptionLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
  };

  render() {
    const { expanded, descriptionExpanded, selectedRecipe } = this.state;
    const { item } = this.props;

    return (
      <ItemContainer>
        <TouchableOpacity onPress={this.changeLayout}>
          <SummaryContainer>
            <Icon name={expanded ? "caret-up" : "caret-down"} size={24} />
            <ItemText>{item.title}</ItemText>
            <IngredientAvailabilityText>
              ~ {item.usedIngredients.length} / {item.totalIngredientsCount}{" "}
              ingredients
            </IngredientAvailabilityText>
          </SummaryContainer>
        </TouchableOpacity>
        <ExpandableContainer expanded={expanded} nestedScrollEnabled>
          <DescriptionItem title="Ingredients" recipe={item} />
          <DescriptionItem
            title="Instructions"
            selectedRecipe={selectedRecipe}
          />
        </ExpandableContainer>
      </ItemContainer>
    );
  }
}

export default RecipeItem;

const SummaryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ItemText = styled.Text`
  font-size: 18px;
  margin-right: auto;
  margin-left: 5px;
`;

const IngredientAvailabilityText = styled.Text`
  font-size: 12px;
  bottom: 15px;
  left: 5px;
`;

const ItemContainer = styled.View`
  padding: 20px;
  border: 1px solid black;
  justify-content: space-between;
  background-color: rgb(242, 202, 68);
  border-radius: 15px;
  margin: 10px;
`;

const ExpandableContainer = styled.ScrollView`
  height: ${(props) => (props.expanded ? "null" : 0)};
  overflow: hidden;
`;
