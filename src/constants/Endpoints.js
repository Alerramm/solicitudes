const BASE_CONFIRMATION_URL = 'http://www.misistema.mx/beluga/Finanzas/endpoints/confirmacion/';
const BASE_OPERATIONS_URL = 'http://www.misistema.mx/beluga/Finanzas/endpoints/solicitudes/';

/** CONSULTA CLIENTES */
export const CONSULTAR_VIAJES = BASE_OPERATIONS_URL + 'get/viajes.php';

export const SOLICITA_VIAJES = BASE_CONFIRMATION_URL + 'post/modifyStatusTravel.php';
