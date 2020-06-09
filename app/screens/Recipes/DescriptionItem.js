import React, { Component } from "react";
import {
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  CheckBox,
  FlatList,
  Text,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components/native";
import IngredientItem from "./IngredientItem";

const ingredientsList = [
  {
    name: "Beans",
    isChecked: false,
  },
  {
    name: "BokChoy",
    isChecked: false,
  },
  {
    name: "String Beans",
    isChecked: false,
  },
  {
    name: "Tongue",
    isChecked: false,
  },
  {
    name: "Chicken",
    isChecked: false,
  },
];

class DescriptionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      ingredients: [],
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded, isChecked } = this.state;
    const { title, recipe, selectedRecipe } = this.props;
    console.log("selected", selectedRecipe);
    return (
      <DescriptionContainer>
        <TouchableOpacity onPress={this.changeLayout}>
          <SummaryContainer>
            <Icon name={expanded ? "caret-up" : "caret-down"} size={24} />
            <ItemText>{title}</ItemText>
          </SummaryContainer>
        </TouchableOpacity>
        <ExpandableScrollableContainer expanded={expanded}>
          {title === "Ingredients" ? (
            <>
              <Text>Owned</Text>
              <FlatList
                data={recipe.usedIngredients}
                listKey={(item, index) => index.toString()}
                renderItem={({ item }) => <IngredientItem ingredient={item} />}
                nestedScrollEnabled
              />
              <Text>Missing</Text>
              <FlatList
                data={recipe.missingIngredients}
                listKey={(item, index) => index.toString()}
                renderItem={({ item }) => <IngredientItem ingredient={item} />}
                nestedScrollEnabled
              />
            </>
          ) : null}
          {selectedRecipe ? (
            <>
              {selectedRecipe.readyInMinutes ? (
                <StyledText>
                  Estimate time: {selectedRecipe.readyInMinutes}
                </StyledText>
              ) : null}
              {selectedRecipe.preparationMinutes ? (
                <StyledText>
                  Prep time: {selectedRecipe.preparationMinutes}
                </StyledText>
              ) : null}
              {selectedRecipe.servings ? (
                <StyledText>Servings: {selectedRecipe.servings}</StyledText>
              ) : null}
              {selectedRecipe.instructions ? (
                <StyledText>{selectedRecipe.instructions}</StyledText>
              ) : null}
            </>
          ) : null}
        </ExpandableScrollableContainer>
      </DescriptionContainer>
    );
  }
}

export default DescriptionItem;

const FoodImage = styled.Image`
    width: 200px,
    height: 200px,
`;

const DescriptionContainer = styled.View`
  padding: 10px;
  margin: 10px;
`;

const SummaryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ItemText = styled.Text`
  font-size: 20px;
  margin-right: auto;
  margin-left: 5px;
`;

const ExpandableScrollableContainer = styled.ScrollView`
  height: ${(props) => (props.expanded ? "null" : 0)};
  overflow: hidden;
`;

const StyledText = styled.Text`
  font-size: 17px;
  color: black;
  padding: 10px;
`;
