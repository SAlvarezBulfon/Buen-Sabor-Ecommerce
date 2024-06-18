import IDetallePedido from "./IDetallePedido";
import { FormaPago } from "./enums/FormaPago";
import { TipoEnvio } from "./enums/TipoEnvio";

export default interface IPedido {
  id?: number;
  tipoEnvio: TipoEnvio;
  formaPago: FormaPago;
  estado:string;
  fechaPedido?: string;
  detallePedidos: IDetallePedido[];
  idCliente: number;
  idDomicilio: number; // Modificado de IDomicilio a number
  total: number; // Añadido
  totalCosto: number; // Añadido
}
