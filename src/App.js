import React, { Component } from 'react';
import './App.css';
import Crypto from './Crypto';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Crypto />
        </header>
      </div>
    );
  }
}

export default App;
