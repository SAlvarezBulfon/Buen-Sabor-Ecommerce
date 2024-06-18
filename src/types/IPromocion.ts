import DataModel from "./DataModel";
import IImagen from "./IImagen";
import { IInsumo } from "./IInsumo";
import IProducto from "./IProducto";

export default interface IPromocion extends DataModel<IPromocion> {
    denominacion: string;
    fechaDesde: string;
    fechaHasta: string;
    horaDesde: string;
    horaHasta: string;
    descripcionDescuento: string;
    precioPromocional: number;
    tipoPromocion: string;
    idSucursales: number[];
    detalles: {
        cantidad: number;
        manufacturado: IProducto | null;
        insumo: IInsumo | null;
        
    }[];
    imagenes: IImagen[]
}
