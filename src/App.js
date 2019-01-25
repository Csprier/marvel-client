import React, { Component } from 'react';
import './App.css';
import Alphabet from './components/Alphabet';
import Characters from './components/Characters';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Marvel App</h1>
        </header>
        <main>
          <Alphabet />
          <Characters />
        </main>
      </div>
    );
  }
}

export default App;
