import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

const WordsApp = () => {
  return (
    <div>Hello world</div>
  );
};

Meteor.startup(() => {
  ReactDOM.render(<WordsApp />, document.getElementById('words-root'));
});