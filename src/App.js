import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
const DQLogo = './img/dishquest.gif';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={DQLogo} className="App-logo" alt="logo" />
          <h3 className="App-title"> DishQuest</h3>
        </header>
        <Search />
      </div>
    );
  }
}

export default App;
