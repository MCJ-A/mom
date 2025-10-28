// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importamos nuestro hook

const ProtectedRoute = () => {
  // Obtenemos el estado de autenticación de nuestro contexto
  const { token, isLoading } = useAuth();

  // 1. ¿Aún estamos cargando/comprobando la sesión?
  // Si es así, mostramos un "Cargando..."
  // (Esto evita redirigir al login antes de que hayamos comprobado localStorage)
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Comprobando sesión...</h3>
      </div>
    );
  }

  // 2. ¿Terminamos de cargar Y NO hay token?
  // Si no hay token, redirigimos al usuario a la página de login.
  // 'replace' evita que el usuario pueda "volver atrás" al historial.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. ¡Éxito!
  // Si terminamos de cargar y SÍ hay un token,
  // renderizamos la página que el usuario solicitó
  // usando el componente especial <Outlet /> de React Router.
  return <Outlet />;
};

export default ProtectedRoute;