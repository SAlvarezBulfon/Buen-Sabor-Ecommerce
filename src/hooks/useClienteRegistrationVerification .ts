import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ClienteService from "../services/ClienteService";

const useClienteRegistrationVerification = () => {
  const { isAuthenticated, user } = useAuth0();
  const [isRegistered, setIsRegistered] = useState(false);
  const clienteService = new ClienteService();

  useEffect(() => {
    const verifyRegistration = async () => {
      if (isAuthenticated && user?.email) {
        const registered = await clienteService.isRegistered(user.email);
        setIsRegistered(registered);
      }
    };

    verifyRegistration();
  }, [isAuthenticated, user?.email, clienteService]);

  return isRegistered;
};

export default useClienteRegistrationVerification;
