import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LetterBox from './LetterBox';

export default class Letter extends Component
{
  ref; // DOM referral
  static propTypes = {
    letter: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    row: PropTypes.number,
    col: PropTypes.number,

    isSelected: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    onSelected: PropTypes.func.isRequired
  };

  _selectLetter() {
    this.props.onSelected({
      row: this.props.row,
      col: this.props.col
    });
  }

  handleMouseOver(evt) {
    if (!!evt.buttons) this._selectLetter();
  }

  handleClick(evt) {
    this._selectLetter();
  }

  render() {
    const fontSize = this.props.size * 0.75;
    const letterClasses = ['table-letter'];
    if (this.props.isSelected) letterClasses.push('selected');
    if (!this.props.isSelected && this.props.isHighlighted) letterClasses.push('highlighted');

    return (
      <LetterBox size={this.props.size}>
        <div
          className={letterClasses.join(' ')}
          ref={ref => this.ref = ref}
        >
          <div
            className="table-letter-text"
            style={{ fontSize }}
            onMouseOver={this.handleMouseOver.bind(this)}
            onMouseDown={this.handleClick.bind(this)}
          >
            {this.props.letter}
          </div>
        </div>
      </LetterBox>
    );
  }
}