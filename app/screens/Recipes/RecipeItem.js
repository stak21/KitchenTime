import React, { Component } from "react";
import { UIManager, LayoutAnimation, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components";

import DescriptionItem from "./DescriptionItem";

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      descriptionExpanded: false,
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  changeDescriptionLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
  };

  render() {
    const { expanded, descriptionExpanded } = this.state;
    const { handleRemoveItem, item } = this.props;

    return (
      <ItemContainer>
        <TouchableOpacity onPress={this.changeLayout}>
          <SummaryContainer>
            <Icon name={expanded ? "caret-up" : "caret-down"} size={24} />
            <ItemText>{item.title}</ItemText>
            <IngredientAvailabilityText>
              ~ {item.availableIngredients} / {item.totalIngredients}{" "}
              ingredients
            </IngredientAvailabilityText>
          </SummaryContainer>
        </TouchableOpacity>
        <ExpandableContainer expanded={expanded}>
          <DescriptionItem title="Ingredients" />
          <DescriptionItem title="Instructions" />
        </ExpandableContainer>
      </ItemContainer>
    );
  }
}

export default ListItem;

const SummaryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ItemText = styled.Text`
  font-size: 20px;
  margin-right: auto;
  margin-left: 5px;
`;

const IngredientAvailabilityText = styled.Text`
  font-size: 14px;
  bottom: 10px;
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

const ExpandableContainer = styled.View`
  height: ${(props) => (props.expanded ? "null" : 0)};
  overflow: hidden;
`;
