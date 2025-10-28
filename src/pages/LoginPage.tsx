// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Esta vez, usamos la función 'login'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      // Llama a la función 'login' de nuestro AuthContext
      await login(email, password);

      // ¡Éxito! Redirigimos al usuario a la PÁGINA DE INICIO
      navigate('/'); 

    } catch (err: any) {
      // Si la API devuelve "Credenciales inválidas", lo mostramos
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        {error && <p className="auth-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>

        <p className="auth-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;