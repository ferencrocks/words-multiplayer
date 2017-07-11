import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux-meteor';
import { Meteor } from 'meteor/meteor';

import ScreenLayout from './ScreenLayout';
import Table from './table/Table';
import reducers from './redux/reducers';

const AppLayout = () => {
  return (
    <ScreenLayout
      main={
        <Table letterMatrix={[
          ['A', 'C', 'D'],
          ['E', 'K', 'G'],
          ['H', 'S', 'X']
        ]}/>
      }
    />
  );
};

function mapTrackerToProps(state, props) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

const App = connect(
  mapTrackerToProps,
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);

const store = createStore(reducers);

export function init() {
  Meteor.startup(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('words-root')
    );
  });
}