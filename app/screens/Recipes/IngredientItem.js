import React, { Component } from "react";
import { CheckBox } from "react-native";
import styled from "styled-components/native";

class ingredientItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  handleCheckBox = () => {
    this.setState((prevState) => {
      return {
        isChecked: !prevState.isChecked,
      };
    });
  };

  render() {
    const { ingredient } = this.props;
    const { isChecked } = this.state;

    return (
      <ItemContainer onPress={this.handleCheckBox}>
        <CheckBox value={isChecked} onValueChange={this.handleCheckBox} />
        <ItemText>{ingredient.name}</ItemText>
      </ItemContainer>
    );
  }
}

export default ingredientItem;

const ItemText = styled.Text`
  font-size: 20px;
`;

const ItemContainer = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  height: 50px;
`;
