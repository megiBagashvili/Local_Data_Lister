import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './App.css';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import { LocalItem } from './types/LocalItem';

function App() {
  const [localItems, setLocalItems] = useState<LocalItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const filteredItems = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    if (!lowerCaseQuery) {
      return localItems;
    }

    return localItems.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(lowerCaseQuery);
      const descriptionMatch = item.description.toLowerCase().includes(lowerCaseQuery);
      const typeMatch = item.type.toLowerCase().includes(lowerCaseQuery);
      const locationMatch = item.location?.toLowerCase().includes(lowerCaseQuery) || false;
      const featuresMatch = item.features?.some(feature => feature.toLowerCase().includes(lowerCaseQuery)) || false;

      return nameMatch || descriptionMatch || typeMatch || locationMatch || featuresMatch;
    });
  }, [localItems, searchQuery]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Local Data Lister</h1>
      </header>
      <main>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {loading && <p>Loading local data...</p>}
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && <ItemList localItems={filteredItems} />}
      </main>
    </div>
  );
}

export default App;