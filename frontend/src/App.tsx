import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [token, setToken] = useState<string | null>(null);
  const [reviewMessage, setReviewMessage] = useState<string>('');

  const fetchLocalData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<LocalItem[]>('http://localhost:8080/api/local-items');
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
  }, []);

  useEffect(() => {
    fetchLocalData();
  }, [fetchLocalData]);

  const handleReviewSubmit = async (itemId: string, rating: number, comment: string) => {
    if (!token) {
      setReviewMessage('You must be logged in to submit a review.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/items/${itemId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setReviewMessage('Thank you! Your review has been submitted.');
        fetchLocalData();
      }
    } catch (err) {
      let message = 'An error occurred while submitting your review.';
      if (axios.isAxiosError(err) && err.response) {
        message = err.response.data.message || message;
      }
      setReviewMessage(message);
      console.error('Review submission error:', err);
    }
  };

  const filteredItems = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    if (!lowerCaseQuery) {
      return localItems;
    }

    return localItems.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(lowerCaseQuery);
      const descriptionMatch = item.description?.toLowerCase().includes(lowerCaseQuery) || false;
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
        <div className="auth-container">
          <input
            type="text"
            placeholder="Paste your JWT token here to 'log in'"
            onChange={(e) => setToken(e.target.value)}
            className="token-input"
          />
        </div>
      </header>
      <main>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {reviewMessage && <p className="review-status-message">{reviewMessage}</p>}
        {loading && <p>Loading local data...</p>}
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <ItemList
            localItems={filteredItems}
            token={token}
            onReviewSubmit={handleReviewSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
