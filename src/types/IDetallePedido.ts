export default interface IDetallePedido {
    cantidad: number;
    subTotal: number;
    idArticulo: number;
    idPedido?: number; // Añadir esta propiedad
  }
  