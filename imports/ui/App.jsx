import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import ScreenLayout from './ScreenLayout';
import TableConnected from './redux/table/TableConnected';
import reducers from './redux/reducers';

const AppLayout = (props) => {
  return (
    <ScreenLayout
      main={
        <TableConnected {...props} />
      }
    />
  );
};

const store = createStore(reducers);

export function init() {
  Meteor.startup(() => {
    ReactDOM.render(
      <Provider store={store}>
        <AppLayout />
      </Provider>,
      document.getElementById('words-root')
    );
  });
}