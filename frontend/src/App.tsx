import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import { LocalItem } from './types/LocalItem';

function App() {
  const [localItems, setLocalItems] = useState<LocalItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<LocalItem[]>('http://localhost:3001/api/local-items');
        setLocalItems(response.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Error fetching data:', err.message);
          setError(`Failed to load data: ${err.message}. Please ensure the backend is running.`);
        } else {
          console.error('An unexpected error occurred:', err);
          setError('An unexpected error occurred while fetching data.');
        }
        setLocalItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Local Data Lister</h1>
      </header>
      <main>
        <SearchBar />
        {loading && <p>Loading local data...</p>} {/* Display loading message */}
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        {!loading && !error && <ItemList localItems={localItems} />} {/* Pass localItems to ItemList */}
      </main>
    </div>
  );
}

export default App;