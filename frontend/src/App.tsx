import React from 'react';
import './App.css';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Local Data Lister</h1>
      </header>
      <main>
        <SearchBar />
        <ItemList />
      </main>
    </div>
  );
}

export default App;
