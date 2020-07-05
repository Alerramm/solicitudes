import React, { Component, Fragment } from 'react';
import { Layout, Table, Modal, Menu, Drawer, Tag, Button, Icon } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { consultaViajes } from './SolicitudesActions';
import maps from './../../../src/img/google-maps.svg';
import access from './../../../src/img/access.svg';
const { Content } = Layout;
const { SubMenu } = Menu;

class Solicitudes extends Component {
	state = {
		data: [],
		columns: [],
		loading: false,
		current: '',
		disabledMenu: false,
		visible: false,
		placement: 'bottom',
	};
	onClose = () => {
		this.setState({
			visible: false,
		});
	};
	onOpen = (e) => {
		console.log(e);
		this.setState({
			visible: true,
		});
	};
	expandedRowRenderEmbarques = (record) => {
		const columnas_embarques = [
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

		return (
			<Table
				size="small"
				columns={columnas_embarques}
				rowKey={(record) => record.id}
				dataSource={record.embarques}
				pagination={false}
			/>
		);
	};

	expandedRowRender = (record) => {
		const columnas_tramos = [
			{ title: 'Id', dataIndex: 'idTramo', key: 'idTramo' },
			{ title: 'Tramo', dataIndex: 'tramo', key: 'tramo' },
			{ title: 'Destino', dataIndex: 'destino', key: 'destino' },
			{ title: 'Origen', dataIndex: 'origen', key: 'origen' },
			{ title: 'Distancia', dataIndex: 'distanciaTramo', key: 'distanciaTramo' },
			{ title: 'Entrega', dataIndex: 'entrega', key: 'entrega' },
			{
				title: 'Fecha',
				dataIndex: 'fecha',
				key: 'fecha',
				render: (record) => {
					return this.diaSemana(record) + ' ' + record;
				},
			},
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
		return (
			<Table
				size="small"
				columns={columnas_tramos}
				rowKey={(record) => record.idTramo}
				expandedRowRender={this.expandedRowRenderEmbarques}
				dataSource={record.tramos}
				pagination={false}
			/>
		);
	};

	diaSemana = (record) => {
		const fecha = new Date(record);
		const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
		return dias[fecha.getUTCDay()];
	};

	componentDidMount = () => {
		const columnas_operaciones = [
			{ title: 'Viaje', dataIndex: 'idViaje', key: 'idViaje' },
			{ title: 'Empresa', dataIndex: 'empresa', key: 'empresa' },
			{
				title: 'Fecha de Carga',
				dataIndex: 'fecha_carga',
				key: 'fecha_carga',
				render: (record) => {
					return this.diaSemana(record) + ' ' + record;
				},
			},
			{ title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
			{ title: 'Unidad', dataIndex: 'unidad', key: 'unidad' },
			{ title: 'Operador', dataIndex: 'operador', key: 'operador' },
			{ title: 'Destino', dataIndex: 'destinoViaje', key: 'destinoViaje' },
			{ title: 'Entrega', dataIndex: 'ruta', key: 'ruta' },
			{
				title: 'Fecha Entrega',
				dataIndex: 'fecha_entrega',
				key: 'fecha_entrega',
				render: (record) => {
					return this.diaSemana(record) + ' ' + record;
				},
			},
			{
				title: 'Fecha Disponibilidad',
				dataIndex: 'fecha_disponibilidad',
				key: 'fecha_disponibilidad',
				render: (record) => {
					return this.diaSemana(record) + ' ' + record;
				},
			},
			{ title: 'Tiempo', dataIndex: 'tiempo_formato', key: 'tiempo_formato' },
			{
				title: 'Distancia',
				dataIndex: 'distanciaViaje',
				key: 'distanciaViaje',
			},
			{ title: 'Grupo', dataIndex: 'grupo', key: 'grupo' },
			{
				title: 'Total viaje',
				dataIndex: 'precio',
				key: 'precio',
				render: (x, record) => {
					console.log(record);
					return (
						<Button type="primary" onClick={() => this.onOpenPrecios(record)}>
							{record.precio}
						</Button>
					);
				},
			},
			{
				title: 'Total costos',
				dataIndex: 'costosTotales',
				key: 'costosTotales',
				render: (x, record) => {
					console.log(record);
					return (
						<Button type="primary" onClick={() => this.onOpen(record)}>
							{record.gasto}
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
							return <Tag color="pink">En carga</Tag>;
						case 'En trayecto':
							return <Tag color="blue">En trayecto</Tag>;
						case 'En regreso':
							return <Tag color="yellow">En regreso</Tag>;
						case 'En facturacion':
							return <Tag color="yellow">Faltante evidencia</Tag>;
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
		this.setState({
			loading: true,
			disabledMenu: true,
			columns: columnas_operaciones,
		});

		consultaViajes('Proceso').then((response) => {
			console.log(response);
			this.setState({
				data: response.payload,
			});

			this.setState({
				loading: false,
				current: 'Proceso',
				disabledMenu: false,
			});
		});
	};

	changeViajesEstatus = (e) => {
		this.setState({
			loading: true,
			disabledMenu: true,
		});

		consultaViajes(e.key).then((response) => {
			this.setState({
				data: response.payload,
			});

			this.setState({
				loading: false,
				current: e.key,
				disabledMenu: false,
			});
		});
	};

	render() {
		const { data, columns, loading, current, disabledMenu, placement, visible } = this.state;
		return (
			<Fragment>
				<Content>
					<Layout style={{ padding: '24px 24px', background: '#fff' }}>
						<Menu
							onClick={this.changeViajesEstatus}
							mode="horizontal"
							activeKey={current}
						>
							<SubMenu
								icon={<SettingOutlined />}
								onTitleClick={this.changeViajesEstatus}
								key="Proceso"
								title="PROCESO"
								disabled={disabledMenu}
							>
								<Menu.Item key="Gastos">Gastos</Menu.Item>
								<Menu.Item key="En proceso cliente">'En proceso cliente</Menu.Item>
								<Menu.Item key="En proceso">En proceso</Menu.Item>
								<Menu.Item key="En trayecto">En trayecto</Menu.Item>
							</SubMenu>
							<Menu.Item
								key="Entrega"
								icon={<MailOutlined />}
								disabled={disabledMenu}
							>
								ENTREGA
							</Menu.Item>
							<Menu.Item
								key="Historial"
								icon={<MailOutlined />}
								disabled={disabledMenu}
							>
								HISTORIAL
							</Menu.Item>
							<Menu.Item key="Todos" icon={<MailOutlined />} disabled={disabledMenu}>
								TODOS
							</Menu.Item>
						</Menu>
						<Table
							className="components-table-demo-nested"
							columns={columns}
							rowKey={(record) => record.idViaje}
							dataSource={data}
							loading={loading}
							size="small"
							expandedRowRender={this.expandedRowRender}
							bordered
							pagination={{ position: 'top' }}
						/>
						<Drawer
							title="Basic Drawer"
							placement={placement}
							closable={false}
							onClose={this.onClose}
							visible={visible}
							key={placement}
						></Drawer>
					</Layout>
				</Content>
			</Fragment>
		);
	}
}
export default Solicitudes;
