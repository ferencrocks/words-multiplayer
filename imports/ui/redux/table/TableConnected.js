import { connect } from 'react-redux-meteor';
import Table from '../../table/Table';

import {
  tableLetterSelected,
  tableSelectionEnded,
  tableLetterHighlightNeghbors
} from './actions';

function mapTrackerToProps(state, props) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    table: state.table.table,
    selectedLetters: state.table.selectedLetters,
    highlightedLetters: state.table.highlightedLetters
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onLetterSelected: letter => {
      dispatch(tableLetterSelected(letter));
      dispatch(tableLetterHighlightNeghbors())
    },
    onMouseUp: () => dispatch(tableSelectionEnded())
  };
}

const TableConnected = connect(
  mapTrackerToProps,
  mapStateToProps,
  mapDispatchToProps
)(Table);
export default TableConnected;