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
    onSelected: PropTypes.func.isRequired
  };

  handleMouseOver(evt) {
    if (!!evt.buttons) this.props.onSelected(this.props.row, this.props.col);
  }

  render() {
    const fontSize = this.props.size * 0.75;
    return (
      <LetterBox size={this.props.size}>
        <div
          className="table-letter"
          ref={ref => this.ref = ref}
          onMouseOver={this.handleMouseOver}
        >
          <div className="table-letter-text" style={{ fontSize }}>
            {this.props.letter}
          </div>
        </div>
      </LetterBox>
    );
  }
}