import { solicitudesApiGet } from './SolicitudesApi';
import { CONSULTAR_VIAJES } from '../../constants/Endpoints';

export const consultaViajes = async (estatus) => {
	const queryView = {
		endpoint: CONSULTAR_VIAJES,
		method: 'POST',
		data: {
			estatus: estatus,
		},
	};
	return solicitudesApiGet(queryView);
};
