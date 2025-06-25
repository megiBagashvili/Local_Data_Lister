import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './LoginPage.css';

interface LoginPageProps {
  onLoginSuccess: (token: string) => void;
  switchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    if (!formData.email || !formData.password) {
      setApiError('Please provide both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post<{ token: string }>(
        'http://localhost:8080/api/auth/login',
        formData
      );
      onLoginSuccess(response.data.token);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.data) {
        const responseData = error.response.data as { message?: string };
        setApiError(responseData.message || 'An unknown login error occurred.');
      } else {
        setApiError('Could not connect to the server. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <h2>Welcome Back!</h2>
        <p>Log in to access your profile and features.</p>

        {apiError && <div className="api-error-message">{apiError}</div>}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="auth-switch-prompt">
          Don't have an account?{' '}
          <button onClick={switchToRegister} className="link-button">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
