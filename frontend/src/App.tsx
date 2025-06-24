import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { io, Socket } from 'socket.io-client';
import './App.css';
import ItemCard from './components/ItemCard'; 
import SearchBar from './components/SearchBar';
import { LocalItem } from './types/LocalItem';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

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

  const handleLoginSuccess = (newToken: string) => {
    handleSetToken(newToken);
    setCurrentPage('home');
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
      const axiosError = err as AxiosError;
      setError(`Failed to load data: ${axiosError.message}. Please ensure the backend is running.`);
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
      await axios.post(
        `http://localhost:8080/api/items/${itemId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviewMessage('Thank you! Your review has been submitted.');
      fetchLocalData();
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      const message = axiosError.response?.data?.message || 'An error occurred while submitting your review.';
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
    switch (currentPage) {
      case 'register':
        return <RegisterPage onSuccess={handleSuccessfulRegister} switchToLogin={() => navigateTo('login')} />;
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} switchToRegister={() => navigateTo('register')} />;
      case 'home':
      default: {
        const itemRows = [];
        for (let i = 0; i < filteredItems.length; i += 2) {
          const itemPair = filteredItems.slice(i, i + 2);
          itemRows.push(
            <div className="item-row" key={`row-${i}`}>
              {itemPair.map(item => (
                <ItemCard
                  key={item.id}
                  localItem={item}
                  token={token}
                  onReviewSubmit={handleReviewSubmit}
                />
              ))}
            </div>
          );
        }

        return (
          <div className='item-list-container'>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {reviewMessage && <p>{reviewMessage}</p>}
            {loading && <p>Loading local data...</p>}
            {error && <p className="api-error-message">{error}</p>}
            {!loading && !error && (
              <div className="item-row-container">
                {itemRows}
              </div>
            )}
          </div>
        );
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Local Lister</h1>
        <nav className="auth-nav">
          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button onClick={() => navigateTo('login')}>Log In</button>
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
