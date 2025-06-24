import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import './App.css';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import { LocalItem } from './types/LocalItem';
import RegisterPage from './pages/RegisterPage';

interface FavoritesUpdate {
  itemId: string;
  newCount: number;
}

type Page = 'home' | 'register' | 'login';

function App() {
  const [localItems, setLocalItems] = useState<LocalItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  const [reviewMessage, setReviewMessage] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authMessage, setAuthMessage] = useState<string>('');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setAuthMessage('');
  };

  const handleSuccessfulRegister = () => {
    setAuthMessage('Registration successful! Please log in.');
    setCurrentPage('login');
  };
  
  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    } else {
      localStorage.removeItem('authToken');
    }
  };

  const handleLogout = () => {
    handleSetToken(null);
    setCurrentPage('home');
  };


  const fetchLocalData = useCallback(async () => {
    try {
      setLoading(true);
      const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await axios.get<LocalItem[]>('http://localhost:8080/api/local-items', { headers });
      setLocalItems(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to load data: ${err.message}. Please ensure the backend is running.`);
      } else {
        setError('An unexpected error occurred while fetching data.');
      }
      setLocalItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchLocalData();
  }, [fetchLocalData]);

  useEffect(() => {
    const socket: Socket = io('http://localhost:8080');
    socket.on('connect', () => console.log('Socket.IO connected'));
    socket.on('favorites-updated', (data: FavoritesUpdate) => {
      setLocalItems(prevItems =>
        prevItems.map(item =>
          item.id === data.itemId ? { ...item, favoriteCount: data.newCount } : item
        )
      );
    });
    socket.on('disconnect', () => console.log('Socket.IO disconnected.'));
    return () => {
      socket.disconnect();
    };
  }, []);

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
  
  const renderPage = () => {
    switch(currentPage) {
      case 'register':
        return <RegisterPage onSuccess={handleSuccessfulRegister} switchToLogin={() => navigateTo('login')} />;
      case 'home':
      default:
        return (
          <>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {reviewMessage && <p className="review-status-message">{reviewMessage}</p>}
            {loading && <p>Loading local data...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
              <div className="items-grid">
                <ItemList
                  localItems={filteredItems}
                  token={token}
                  onReviewSubmit={handleReviewSubmit}
                />
              </div>
            )}
          </>
        )
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>Local Data Lister</h1>
        <nav className="auth-nav">
          {token ? (
            <button onClick={handleLogout} className="link-button">Logout</button>
          ) : (
            <>
              <button onClick={() => navigateTo('login')} className="link-button">Log In</button>
              <button onClick={() => navigateTo('register')} className="nav-button-primary">Sign Up</button>
            </>
          )}
        </nav>
      </header>
      <main>
        {authMessage && <div className="review-status-message">{authMessage}</div>}
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
