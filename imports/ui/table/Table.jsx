import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';
import Letter from './Letter';

import Loading from '../common/Loading';

export default class Table extends Component
{
  static propTypes = {
    table: PropTypes.array,
    selectedLetters: PropTypes.array,
    highlightedLetters: PropTypes.array,

    onLetterSelected: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired
  };
  wordsTable;

  constructor(props) {
    super(props);
    this.state = {
      letterSize: 0
    };
  }

  rows() {
    return this.props.table ? this.props.table.length : 0;
  }
  cols() {
    return this.props.table ? this.props.table[0].length : 0;
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
    const isInList = (list) => (row, col) => list && list.find(letter => letter.row === row && letter.col === col);
    const isSelected = isInList(this.props.selectedLetters);
    const isHighlighted = isInList(this.props.highlightedLetters);

    if (!this.props.table) return <Loading />;
    return this.props.table.map((row, rowIdx) => (
      <TableRow key={rowIdx}>
        {row.map((col, colIdx) =>
          <Letter
            key={`${rowIdx} ${colIdx}`}
            letter={col}
            row={rowIdx}
            col={colIdx}
            size={this.state.letterSize}

            isSelected={isSelected(rowIdx, colIdx)}
            isHighlighted={isHighlighted(rowIdx, colIdx)}
            onSelected={letter => this.props.onLetterSelected(letter)}
          />
        )}
      </TableRow>
    ));
  }

  render() {
    return (
      <section
        className="words-table"
        ref={table => this.wordsTable = table}
        onMouseUp={this.props.onMouseUp}
      >
        {this.renderLetters()}
      </section>
    );
  }
}