import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const CallbackPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0(); // Agrega isLoading para manejar el estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    // Evita el redireccionamiento si isLoading es verdadero
    if (!isLoading) {
      // Verifica si el usuario está autenticado y no en estado de carga
      if (isAuthenticated) {
        navigate('/productos');  
      } else {
        navigate('/');  
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  return isLoading ? <div>Loading...</div> : null; // Renderiza un mensaje de carga solo cuando isLoading sea verdadero
};

export default CallbackPage;
