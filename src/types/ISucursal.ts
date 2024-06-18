import DataModel from "./DataModel";
import ICategoria from "./ICategoria";
import IDomicilio from "./IDomicilio";
import IEmpresa from "./IEmpresa";


export default interface ISucursal extends DataModel<ISucursal>{
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    domicilio: IDomicilio;
    empresa: IEmpresa;
    esCasaMatriz: boolean; 
    categorias?: ICategoria[];
} 