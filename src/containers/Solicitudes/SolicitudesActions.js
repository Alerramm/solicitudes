import { solicitudesApiGet } from './SolicitudesApi';
import { CONSULTAR_VIAJES, SOLICITA_VIAJES } from '../../constants/Endpoints';

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

export const solicitaViaje = async (data) => {
	const queryView = {
		endpoint: SOLICITA_VIAJES,
		method: 'POST',
		data,
	};
	return solicitudesApiGet(queryView);
};
