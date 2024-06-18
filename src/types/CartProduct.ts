import IProducto from "./IProducto";
import IPromocion from "./IPromocion";

export default interface CartProduct extends IProducto, IPromocion {
  quantity: number;
  nombre: string;
}
