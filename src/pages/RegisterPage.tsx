// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importamos Link
import { useAuth } from '../context/AuthContext'; // Nuestro hook de autenticación

const RegisterPage: React.FC = () => {
  // 1. Hook para navegar (redirigir)
  const navigate = useNavigate(); 
  
  // 2. Hook de nuestro contexto de autenticación
  const { register } = useAuth(); 

  // 3. Estado local para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Para mostrar errores

  // 4. Manejador del envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita que la página se recargue
    setError(null); // Limpia errores antiguos

    try {
      // Llama a la función 'register' de nuestro AuthContext
      await register(email, password);
      
      // ¡Éxito! Redirigimos al usuario a la página de login
      navigate('/login'); 

    } catch (err: any) {
      // Si la API devuelve un error (ej. "Email ya en uso"), lo mostramos
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      {/* 5. Conectamos el formulario al 'handleSubmit' */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        
        {/* Mostramos el error si existe */}
        {error && <p className="auth-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          {/* 6. Inputs controlados */}
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
        <button type="submit">Crear Cuenta</button>

        <p className="auth-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;