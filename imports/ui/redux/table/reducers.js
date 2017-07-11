import {
  TABLE_LETTER_SELECTED,
  TABLE_SELECTION_ENDED,
  TABLE_LETTER_HIGHLIGHT_NEIGHBORS

} from './actions';

import { neighbors } from '../../../solver/Solver';

export const table = (state, action) => {
  const isLetterSelected = letter => !!state.selectedLetters.find(l => letter.row === l.row && letter.col === l.col);

  switch (action.type) {
    case TABLE_LETTER_SELECTED:
      if (!isLetterSelected(action.letter)) {
        return {
          ...state,
          selectedLetters: [...state.selectedLetters, action.letter],
          selectionInProgress: true,
          selectedWord: state.selectedWord + state.table[action.letter.row][action.letter.col]
        };
      }
      else {
        return {...state};
      }
    break;

    case TABLE_SELECTION_ENDED:
      return {
        ...state,
        selectionInProgress: false,
        selectedLetters: [],
        highlightedLetters: [],
        selectedWord: ''
      };
    break;

    case TABLE_LETTER_HIGHLIGHT_NEIGHBORS:
      const [letter, ...others] = state.selectedLetters.reverse();
      return {
        ...state,
        highlightedLetters: neighbors(letter).map(letter => ({
          row: letter.row,
          col: letter.col
        }))
      };
    break;

    default:
      return {
        table: [
          ['A', 'C', 'D', 'T'],
          ['E', 'K', 'G', 'K'],
          ['H', 'S', 'X', 'I'],
          ['E', 'K', 'G', 'K'],
        ],
        selectedLetters: [],
        highlightedLetters: [],
        selectionInProgress: false,
        selectedWord: ''
      };
  }
};