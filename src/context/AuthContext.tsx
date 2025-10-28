// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// (He puesto la URL de Render, pero puedes cambiarla a localhost si estás probando localmente)
const API_BASE_URL = 'https://mom-api-bnrp.onrender.com'; 
// const API_BASE_URL = 'http://localhost:4000';

interface User {
  email: string;
}

interface IAuthContext {
  user: User | null;
  token: string | null;
  isLoading: boolean; // Seguimos necesitando esto para el ProtectedRoute
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Este useEffect para "recordar" la sesión está perfecto.
  useEffect(() => {
    const checkUserSession = () => {
      try {
        const storedToken = localStorage.getItem('mom_token');
        if (storedToken) {
          setToken(storedToken);
          // (Aquí podríamos decodificar el token para 'setUser',
          // pero lo haremos simple por ahora)
        }
      } catch (error) {
        console.error("Error al cargar la sesión:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []);

  // Las funciones register, login y logout no cambian
  const register = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar');
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }
    const data: { token: string; email: string } = await response.json();
    setToken(data.token);
    setUser({ email: data.email });
    localStorage.setItem('mom_token', data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mom_token');
  };

  const value = {
    user,
    token,
    isLoading,
    register,
    login,
    logout,
  };

  // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
  // El Proveedor ahora SIEMPRE renderiza la aplicación ('children').
  // Ya no tiene la lógica de '!isLoading'.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};