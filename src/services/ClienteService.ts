import ICliente from "../types/ICliente";
import ClientePost from "../types/post/ClientePost";
import BackendClient from "./BackendClient";

export default class ClienteService extends BackendClient<ICliente | ClientePost> {
    
    async isRegistered(email: string): Promise<boolean> {
        const url = `${import.meta.env.VITE_API_URL}/clientes/email/${encodeURIComponent(email)}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.status === 200; 
        } catch (error) {
            console.error("Error checking if user is registered:", error);
            return false;
        }
    }
}
