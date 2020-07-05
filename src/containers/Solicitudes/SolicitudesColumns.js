import React from 'react';
import { Table, Tag, Button, Icon } from 'antd';
import maps from './../../../src/img/google-maps.svg';
import access from './../../../src/img/access.svg';
import solicitudes from './Solicitudes';

export const columnas_operaciones = [
	{ title: 'Viaje', dataIndex: 'idViaje', key: 'idViaje' },
	{ title: 'Empresa', dataIndex: 'empresa', key: 'empresa' },
	{ title: 'Fecha de Carga', dataIndex: 'fecha_carga', key: 'fecha_carga' },
	{ title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
	{ title: 'Unidad', dataIndex: 'unidad', key: 'unidad' },
	{ title: 'Operador', dataIndex: 'operador', key: 'operador' },
	{ title: 'Destino', dataIndex: 'destinoViaje', key: 'destinoViaje' },
	{ title: 'Entrega', dataIndex: 'ruta', key: 'ruta' },
	{ title: 'Fecha Entrega', dataIndex: 'fecha_entrega', key: 'fecha_entrega' },
	{
		title: 'Fecha Disponibilidad',
		dataIndex: 'fecha_disponibilidad',
		key: 'fecha_disponibilidad',
	},
	{ title: 'Tiempo', dataIndex: 'tiempo_formato', key: 'tiempo_formato' },
	{
		title: 'Distancia',
		dataIndex: 'distanciaViaje',
		key: 'distanciaViaje',
	},
	{ title: 'Grupo', dataIndex: 'grupo', key: 'grupo' },
	{ title: 'Total viaje', dataIndex: 'precio', key: 'precio' },
	{
		title: 'Total costos',
		dataIndex: 'costosTotales',
		key: 'costosTotales',
		render: () => {
			return (
				<Button type="primary" onClick={solicitudes.onOpen()}>
					Open
				</Button>
			);
		},
	},
	{
		title: 'Estatus',
		dataIndex: 'estatusViaje',
		key: 'estatusViaje',
		render: (record) => {
			switch (record) {
				case 'Gastos':
					return <Tag color="orange">Gastos</Tag>;
				case 'En proceso cliente':
					return <Tag color="brown">En proceso cliente</Tag>;
				case 'En proceso':
					return <Tag color="pink">En proceso</Tag>;
				case 'En trayecto':
					return <Tag color="blue">En trayecto</Tag>;
				case 'En regreso':
					return <Tag color="yellow">En regreso</Tag>;
				case 'Finalizado':
					return <Tag color="green">Finalizado</Tag>;
				case 'Cancelado':
					return <Tag color="red">Cancelado</Tag>;
				default:
					return <Tag>{record}</Tag>;
			}
		},
	},
	/* {
		title: 'Estatus App Operador',
		dataIndex: 'estatusAppOperador',
		key: 'estatusAppOperador',
		render: (record) => {
			if (record == 'Pendiente') {
				return <Tag color="volcano">Pendiente</Tag>;
			}
			if (record == 'Finalizado') {
				return <Tag color="green">Finalizado</Tag>;
			}
		},
	}, */
];

export const columnas_tramos = [
	{ title: 'Id', dataIndex: 'idTramo', key: 'idTramo' },
	{ title: 'Tramo', dataIndex: 'tramo', key: 'tramo' },
	{ title: 'Destino', dataIndex: 'destino', key: 'destino' },
	{ title: 'Origen', dataIndex: 'origen', key: 'origen' },
	{ title: 'Distancia', dataIndex: 'distanciaTramo', key: 'distanciaTramo' },
	{ title: 'Entrega', dataIndex: 'entrega', key: 'entrega' },
	{ title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
	{ title: 'Observaciones', dataIndex: 'observaciones', key: 'observaciones' },
	{
		title: 'Tiempo',
		dataIndex: 'tiempo',
		key: 'tiempo',
		render: (record) => {
			let days = Math.floor(record / (3600 * 24));
			record -= days * 3600 * 24;
			let hrs = Math.floor(record / 3600);
			record -= hrs * 3600;
			let mnts = Math.floor(record / 60);
			record -= mnts * 60;
			return days + 'dias ' + hrs + 'hrs ' + mnts + 'm ' + record + 's';
		},
	},
	{
		title: 'Tiempo de Carga',
		dataIndex: 'tiempo_carga',
		key: 'tiempo_carga',
		render: (record) => {
			return record + ' h';
		},
	},
	{
		title: 'Estatus',
		dataIndex: 'estatusTramo',
		key: 'estatusTramo',
		render: (record) => {
			switch (record) {
				case 'Pendiente':
					return <Tag color="yellow">Pendiente</Tag>;
				case 'Bloqueado':
					return <Tag color="red">Bloqueado</Tag>;
				case 'Finalizado':
					return <Tag color="green">Finalizado</Tag>;
				default:
					return <Tag>{record}</Tag>;
			}
		},
	},
	{
		title: 'Link',
		dataIndex: 'link',
		key: 'link',
		render: (record) => {
			return <img src={maps} />;
		},
	},
	{
		title: 'Casetas',
		dataIndex: 'casetas',
		key: 'casetas',
		render: (record) => {
			const iconoAccess = () => <img src={access} />;
			return <Icon component={iconoAccess} />;
		},
	},
];

export const columnas_embarques = [
	{ title: 'Numero', dataIndex: 'numero', key: 'numero' },
	{ title: 'Cajas', dataIndex: 'cajas', key: 'cajas' },
	{ title: 'Cajas Entregadas', dataIndex: 'cajas_entregadas', key: 'cajas_entregadas' },
	{ title: 'Cajas Rechazadas', dataIndex: 'cajas_rechazadas', key: 'cajas_rechazadas' },
	{
		title: 'Estatus',
		dataIndex: 'estatusEmbarque',
		key: 'estatusEmbarque',
		render: (record) => {
			switch (record) {
				case 'Pendiente':
					return <Tag color="yellow">Pendiente</Tag>;
				case 'Bloqueado':
					return <Tag color="orange">Bloqueado</Tag>;
				case 'Rechazo':
					return <Tag color="red">Rechazo</Tag>;
				case 'Finalizado':
					return <Tag color="green">Finalizado</Tag>;
				default:
					return <Tag>{record}</Tag>;
			}
		},
	},
];
