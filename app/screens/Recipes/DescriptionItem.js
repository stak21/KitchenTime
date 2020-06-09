import React, { Component } from "react";
import { UIManager, LayoutAnimation, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components";

class DescriptionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
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
    const { expanded } = this.state;
    const { title } = this.props;

    return (
      <DescriptionContainer>
        <TouchableOpacity onPress={this.changeLayout}>
          <SummaryContainer>
            <Icon name={expanded ? "caret-up" : "caret-down"} size={24} />
            <ItemText>{title}</ItemText>
          </SummaryContainer>
        </TouchableOpacity>
        <ExpandableScrollableContainer expanded={expanded}>
          <StyledText>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </StyledText>
        </ExpandableScrollableContainer>
      </DescriptionContainer>
    );
  }
}

export default DescriptionItem;

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
  height: ${(props) => (props.expanded ? 250 : 0)};
  overflow: hidden;
`;

const StyledText = styled.Text`
  font-size: 17px;
  color: black;
  padding: 10px;
`;
