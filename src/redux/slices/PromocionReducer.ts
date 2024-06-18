
import IPromocion from '../../types/IPromocion';
import { createGenericSlice } from './GenericReducer';

const promocionSlice = createGenericSlice<IPromocion[]>('promocionState', { data: [] });

export const { setData: setPromocion, resetData: resetPromocion } = promocionSlice.actions;

export default promocionSlice.reducer;