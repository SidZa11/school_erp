// src/hooks/auth/useLogin.ts
import { useState } from 'react';
import api from '../../api/api';
import { jwtDecode } from 'jwt-decode';

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  status: number;
  message: string;
  token: string;
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async ({ username, password }: LoginRequest): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        username,
        password,
      });

      const token = response.data.token;

    // Decode token to extract user info
    const decoded = jwtDecode(token) as {
      ID: number;
      UserID: string;
      Username: string;
      RoleID: number;
      exp: number;
    };

    const user = JSON.stringify({
        ID: decoded.ID,
        UserID: decoded.UserID,
        Username: decoded.Username,
        RoleID: decoded.RoleID
    })

    // Save to sessionStorage
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('token_expiry', String(decoded.exp * 1000));

      return response.data;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
