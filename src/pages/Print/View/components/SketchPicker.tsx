import React from 'react';
import { SketchPicker } from 'react-color';

export default class Component extends React.Component<{
  setColor: (rgb: ColorResult) => void;
  color: ColorResult;
}> {
  handleChangeComplete = (color) => {
    this.props.setColor(color);
  };

  render() {
    return (
      <SketchPicker
        color={this.props.color.rgb}
        onChange={this.handleChangeComplete}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}
