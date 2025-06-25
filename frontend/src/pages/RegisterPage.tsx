import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './RegisterPage.css';

interface RegisterPageProps {
  onSuccess: () => void;
  switchToLogin: () => void;
}

interface ZodFlatError {
  formErrors: string[];
  fieldErrors: {
    [key: string]: string[] | undefined;
  };
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);
    setErrors({});

    try {
      await axios.post('/api/auth/register', formData);
      onSuccess();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.data) {
        const responseData = error.response.data as any;

        if (responseData.errors) {
          const zodErrors = responseData.errors as ZodFlatError;
          const newErrors: typeof errors = {};
          
          for (const key in zodErrors.fieldErrors) {
            if (zodErrors.fieldErrors[key] && zodErrors.fieldErrors[key]!.length > 0) {
              newErrors[key as keyof typeof errors] = zodErrors.fieldErrors[key]![0];
            }
          }
          setErrors(newErrors);
        } else {
          setApiError(responseData.message || 'An unknown error occurred.');
        }
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
        <h2>Create an Account</h2>
        <p>Join the community to save favorites and leave reviews.</p>
        
        {apiError && <div className="api-error-message">{apiError}</div>}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              required
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              required
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              required
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className={errors.passwordConfirm ? 'input-error' : ''}
              required
            />
            {errors.passwordConfirm && <span className="field-error">{errors.passwordConfirm}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch-prompt">
          Already have an account?{' '}
          <button onClick={switchToLogin} className="link-button">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
