import DataModel from "./DataModel";
import IDomicilio from "./IDomicilio";

export default interface ICliente extends DataModel<ICliente>{
    nombre:string;
    apellido: string;
    telefono: string;
    email: string;
    fechaNacimiento: string;
    domicilios: IDomicilio[]
}