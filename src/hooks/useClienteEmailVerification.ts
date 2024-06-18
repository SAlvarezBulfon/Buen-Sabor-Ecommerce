import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'; // Importa el hook useAuth0

const useClienteEmailVerification = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0(); // Obtén los datos de autenticación y el usuario desde Auth0
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verificarEmailCliente = async () => {
      try {
        if (isAuthenticated && user?.email) { // Verifica si el usuario está autenticado en Auth0 y si tiene un email
          const response = await fetch(
            `${URL}/clientes/email/${encodeURIComponent(
              user.email // Utiliza el email del usuario autenticado en Auth0
            )}`,
          );

          if (!response.ok) {
            // Si la solicitud no es exitosa, redirige a la pantalla de registro
            navigate("/registro");
          }
        }
      } catch (error) {
        console.error("Error verificando el email del cliente:", error);
        // Manejar el error según sea necesario
      }
    };

    verificarEmailCliente();
  }, [isAuthenticated, navigate, user?.email, URL]);

  return null; // Este componente no renderiza nada
};

export default useClienteEmailVerification;
