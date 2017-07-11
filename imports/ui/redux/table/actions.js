export const TABLE_LETTER_SELECTED = 'TABLE_LETTER_SELECTED';
export const tableLetterSelected = (letter) => {
  return {type: TABLE_LETTER_SELECTED, letter};
};

export const TABLE_SELECTION_ENDED = 'TABLE_SELECTION_ENDED';
export const tableSelectionEnded = () => {
  return {type: TABLE_SELECTION_ENDED};
};

export const TABLE_LETTER_HIGHLIGHT_NEIGHBORS = 'TABLE_LETTER_HIGHLIGHT_NEIGHBORS';
export const tableLetterHighlightNeghbors = () => {
  return {type: TABLE_LETTER_HIGHLIGHT_NEIGHBORS};
};