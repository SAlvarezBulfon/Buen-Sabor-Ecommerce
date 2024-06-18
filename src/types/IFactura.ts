import { FormaPago } from './enums/FormaPago';

export default interface IFactura {
  fechaFacturacion: string;
  mpPaymentId: number;
  mpMerchantOrderId: number;
  mpPreferenceId: string;
  mpPaymentType: string;
  formaPago: FormaPago;
  totalVenta: number;
}