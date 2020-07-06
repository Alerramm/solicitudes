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

	expandedRowRender = (record) => {
		const columnas_tramos = [
			{ title: 'Id', dataIndex: 'idTramo', key: 'idTramo' },
			{ title: 'Seguro',},
			{ title: 'Maniobra',},
			{ title: 'Seguridad',},
			{ title: 'Custodia',},
			{ title: 'Beluga méxico',},
			{ title: 'Externos',},
		];
		return (
			<Table
				size="small"
				columns={columnas_tramos}
				rowKey={(record) => record.idTramo}
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
			{ title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
			{ title: 'Dirección de Carga' },
			{
				title: 'Fecha y Hora de Carga',
				dataIndex: 'fecha_carga',
				key: 'fecha_carga',
				render: (record) => {
					return this.diaSemana(record) + ' ' + record;
				},
			},
			{ title: 'Tipo de Adecuación' },
			{ title: 'Tipo de Unidad', dataIndex: 'unidad', key: 'unidad' },
			{ title: 'Dirección de Entrega' },
			{ title: 'Destino', dataIndex: 'destinoViaje', key: 'destinoViaje' },
			{
				title: 'Fecha y Hora Entrega',
				dataIndex: 'fecha_entrega',
				key: 'fecha_entrega',
				render: (record) => {
					return this.diaSemana(record) + ' ' + record;
				},
			},
			{ title: 'Servicio' },
			{ title: 'Precio $' },
			{
				title: 'Confirmación de solicitud',
				dataIndex: 'confirmacionSolicitud',
				key: 'confirmacionSolicitud',
				render: () => {
					return (
						<Button type="primary">
							Confirmación de Solicitud
						</Button>
					);
				},
			},
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
