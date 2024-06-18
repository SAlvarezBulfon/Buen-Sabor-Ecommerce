import IPedido from '../../types/IPedido';
import { createGenericSlice } from './GenericReducer';

const pedidoSlices = createGenericSlice<IPedido[]>('pedidoState', { data: [] });

export const { setData: setPedido, resetData: resetPedido } = pedidoSlices.actions;

export default pedidoSlices.reducer;