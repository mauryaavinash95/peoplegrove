import React, { Component } from 'react';
import './App.css';
import { routes } from './router'
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {routes}
        </div>
      </Provider>
    );
  }
}

export default App;
