/** @jsxImportSource @emotion/react */
import { useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { login as loginApi } from '@domains/auth/api';
import { useAuth } from '@hooks/useAuth';
import type { Theme } from '@styles/theme';
import { loginStyles } from './Login.styles';

export const LoginPage = () => {
  const theme = useTheme() as Theme;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.token, data.user);
      if (data.user.role === 'manager') {
        navigate('/dashboard/manager');
      } else {
        navigate('/dashboard');
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div css={loginStyles(theme)}>
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Vacation Portal</h1>

        <div className="login__input-group">
          <label className="login__label" htmlFor="email">Email</label>
          <input
            className="login__input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="login__input-group">
          <label className="login__label" htmlFor="password">Password</label>
          <input
            className="login__input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        {mutation.isError && (
          <div className="login__error-message">
            Login failed. Please check your credentials.
          </div>
        )}

        <button
          className="login__submit-button"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};
