import React from 'react';

const LetterBox = ({ children, size }) => {
  const style = {
    width: size + 'px',
    height: size + 'px'
  };

  return (
    <div className="letter-box" style={style}>
      {children}
    </div>
  )
};
export default LetterBox;