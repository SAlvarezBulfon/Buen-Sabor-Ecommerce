

export default interface PedidoPost {
    id?: number; 
    tipoEnvio: string;
    formaPago: string;
    fechaPedido?: string; 
    detallePedidos: {
        cantidad: number;
        subTotal: number;
        idArticulo: number;
      }[];
    idCliente: number;
    idDomicilio: number; 
}