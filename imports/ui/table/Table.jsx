import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';
import Letter from './Letter';

export default class Table extends Component
{
  static propTypes = {
    letterMatrix: PropTypes.array.isRequired
  };
  wordsTable;

  constructor(props) {
    super(props);
    this.state = {
      letterSize: 0
    };
  }

  rows() {
    return this.props.letterMatrix.length;
  }
  cols() {
    return this.props.letterMatrix[0].length;
  }

  componentDidMount() {
    const rows = this.rows();
    const cols = this.cols();

    const resizeLetters = () => {
      const tableW = this.wordsTable.clientWidth;
      const tableH = this.wordsTable.clientHeight;

      const allSize = tableW > tableH ? tableH : tableW;
      const count = rows > cols ? rows : cols;
      const letterSize = allSize / count;
      this.setState({ letterSize });
    };

    resizeLetters();
    window.addEventListener('resize', (evt) => resizeLetters());
  }

  renderLetters() {
    return this.props.letterMatrix.map((row, rowIdx) => (
      <TableRow key={rowIdx}>
        {row.map((col, colIdx) =>
          <Letter
            key={`${rowIdx} ${colIdx}`}
            letter={col}
            row={rowIdx}
            col={colIdx}
            size={this.state.letterSize}
          />
        )}
      </TableRow>
    ));
  }

  render() {
    return (
      <section className="words-table" ref={table => this.wordsTable = table}>
        {this.renderLetters()}
      </section>
    );
  }
}