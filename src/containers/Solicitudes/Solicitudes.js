import React, { Component, Fragment } from 'react';
import {
	Layout,
	Table,
	InputNumber,
	Badge,
	Dropdown,
	Button,
	message,
	Modal,
	Tag,
	Typography,
	Menu,
} from 'antd';
import { consultaViajes, solicitaViaje } from './SolicitudesActions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { confirm } = Modal;
const { Title } = Typography;

class Solicitudes extends Component {
	state = {
		data1: [],
		data2: [],
		columns1: [],
		columns2: [],
		loading1: false,
		loading2: false,
		id: 0,
		parcial: false,
		monto: 0,
		tipo: '',
		btnAplicar: true,
		idKey: '',
		tipoViaje: [],
		selectedRowKeys: [],
		empresa: '',
		total1: 0,
		total2: 0,
		sin_atender1: 0,
		sin_atender2: 0,
		sin_operador1: 0,
		sin_operador2: 0,
		sin_estatus1: 0,
		sin_estatus2: 0,
	};

	//ok
	handleChange1 = (id, value, columna) => {
		const { data1 } = this.state;
		data1.map((viaje) => {
			if (id === viaje.key) {
				viaje[columna] = value;
			}
			return viaje;
		});
		this.setState({
			data1,
		});
	};

	handleChange2 = (id, value, columna) => {
		const { data2 } = this.state;
		data2.map((viaje) => {
			if (id === viaje.key) {
				viaje[columna] = value;
			}
			return viaje;
		});
		this.setState({
			data2,
		});
	};

	//ok
	estatus = (label) => {
		let badge = '';
		switch (label) {
			case 'Pendiente':
				badge = 'orange';
				break;
			case 'Aprobado':
				badge = 'green';
				break;
			case 'Confirmado':
				badge = 'green';
				break;
			case 'Rechazado':
				badge = 'red';
				break;
			default:
				badge = 'blue';
				break;
		}
		return <Tag color={badge}>{label}</Tag>;
	};

	//ok
	expandedRowRender1 = (record) => {
		const columns = [
			{ title: 'Seguro', dataIndex: 'seguro', key: 'seguro' },
			{ title: 'Maniobras', dataIndex: 'maniobra', key: 'maniobra' },
			{ title: 'Seguridad', dataIndex: 'seguridad', key: 'seguridad' },
			{ title: 'Custodia', dataIndex: 'custodia', key: 'custodia' },
		];
		return <Table columns={columns} dataSource={record.adicionales} pagination={false} />;
	};

	expandedRowRender2 = (record) => {
		const columns = [
			{ title: 'Seguro', dataIndex: 'seguro', key: 'seguro' },
			{ title: 'Maniobras', dataIndex: 'maniobra', key: 'maniobra' },
			{ title: 'Seguridad', dataIndex: 'seguridad', key: 'seguridad' },
			{ title: 'Custodia', dataIndex: 'custodia', key: 'custodia' },
		];
		return <Table columns={columns} dataSource={record.adicionales} pagination={false} />;
	};

	//ok
	componentDidMount = () => {
		this.setState({
			loading1: true,
			loading2: true,
		});
		const menu = (
			<Menu>
				<Menu.Item>{this.estatus('Rechazado')}</Menu.Item>
				<Menu.Item>{this.estatus('Confirmado')}</Menu.Item>
			</Menu>
		);
		let columns1 = [
			{
				title: 'GRUPO 1',
				children: [
					{
						title: 'ESTATUS',
						dataIndex: 'estatus_app',
						key: 'estatus_app',
						render: (record, label) => {
							return (
								<Dropdown overlay={menu} placement="bottomCenter">
									{this.estatus(record)}
								</Dropdown>
							);
						},
					},
					{ title: 'Id', dataIndex: 'id', key: 'id' },
					{
						title: 'INFORMACION DE CARGA',
						children: [
							{
								title: 'CLIENTE',
								dataIndex: 'cliente',
								key: 'cliente',
							},
							{
								title: 'DIRECCION DE CARGA',
								dataIndex: 'direccion_carga',
								key: 'direccion_carga',
							},
							{
								title: 'FECHA DE CARGA',
								dataIndex: 'fecha_carga',
								key: 'fecha_carga',
							},
							{
								title: 'TIPO DE ADECUACION',
								dataIndex: 'tipo_adecuacion',
								key: 'tipo_adecuacion',
							},
							{
								title: 'TIPO DE UNIDAD',
								dataIndex: 'tipo_unidad',
								key: 'tipo_unidad',
							},
						],
					},

					{
						title: 'INFORMACION DE EMPRESA DE TRANSPORTE',
						children: [
							{
								title: 'EMPRESA',
								dataIndex: 'empresa',
								key: 'empresa',
							},
							{
								title: 'OPERADOR',
								dataIndex: 'operador',
								key: 'operador',
							},
							{
								title: 'UNIDAD',
								dataIndex: 'unidad',
								key: 'unidad',
							},
						],
					},
					{
						title: 'INFORMACION DE ENTREGA',
						children: [
							{
								title: 'ENTREGA',
								dataIndex: 'entrega',
								key: 'entrega',
							},
							{
								title: 'DESTINO',
								dataIndex: 'destino',
								key: 'destino',
							},
							{
								title: 'FECHA DE ENTREGA',
								dataIndex: 'fecha_entrega',
								key: 'fecha_entrega',
							},
						],
					},
					{
						title: 'SERVICIO',
						dataIndex: 'servicio',
						key: 'servicio',
					},
					{
						title: 'PRECIO',
						dataIndex: 'precio',
						key: 'precio',
					},
				],
			},
		];
		let columns2 = [
			{
				title: 'GRUPO 2',
				children: [
					{
						title: 'ESTATUS',
						dataIndex: 'estatus_app',
						key: 'estatus_app',
						render: (record) => {
							return (
								<Dropdown overlay={menu} placement="bottomCenter">
									{this.estatus(record)}
								</Dropdown>
							);
						},
					},
					{ title: 'Id', dataIndex: 'id', key: 'id' },
					{
						title: 'INFORMACION DE CARGA',
						children: [
							{
								title: 'CLIENTE',
								dataIndex: 'cliente',
								key: 'cliente',
							},
							{
								title: 'DIRECCION DE CARGA',
								dataIndex: 'direccion_carga',
								key: 'direccion_carga',
							},
							{
								title: 'FECHA DE CARGA',
								dataIndex: 'fecha_carga',
								key: 'fecha_carga',
							},
							{
								title: 'TIPO DE ADECUACION',
								dataIndex: 'tipo_adecuacion',
								key: 'tipo_adecuacion',
							},
							{
								title: 'TIPO DE UNIDAD',
								dataIndex: 'tipo_unidad',
								key: 'tipo_unidad',
							},
						],
					},

					{
						title: 'INFORMACION DE EMPRESA DE TRANSPORTE',
						children: [
							{
								title: 'EMPRESA',
								dataIndex: 'empresa',
								key: 'empresa',
							},
							{
								title: 'OPERADOR',
								dataIndex: 'operador',
								key: 'operador',
							},
							{
								title: 'UNIDAD',
								dataIndex: 'unidad',
								key: 'unidad',
							},
						],
					},
					{
						title: 'INFORMACION DE ENTREGA',
						children: [
							{
								title: 'ENTREGA',
								dataIndex: 'entrega',
								key: 'entrega',
							},
							{
								title: 'DESTINO',
								dataIndex: 'destino',
								key: 'destino',
							},
							{
								title: 'FECHA DE ENTREGA',
								dataIndex: 'fecha_entrega',
								key: 'fecha_entrega',
							},
						],
					},
					{
						title: 'SERVICIO',
						dataIndex: 'servicio',
						key: 'servicio',
					},
					{
						title: 'PRECIO',
						dataIndex: 'precio',
						key: 'precio',
					},
				],
			},
		];
		consultaViajes().then((response) => {
			let viajes = response.payload;
			this.setState({
				columns1,
				columns2,
				total1: viajes.G1.total,
				total2: viajes.G2.total,
				sin_atender1: viajes.G1.sin_atender,
				sin_atender2: viajes.G2.sin_operador,
				sin_operador1: viajes.G1.sin_operador,
				sin_operador2: viajes.G2.sin_operador,
				sin_estatus1: viajes.G1.sin_estatus,
				sin_estatus2: viajes.G2.sin_estatus,
				data1: viajes.G1.viajes,
				data2: viajes.G2.viajes,
				loading1: false,
				loading2: false,
			});
		});
	};

	onSelectChange1 = (selectedRowKeys) => {
		console.log(selectedRowKeys);
		const { data1 } = this.state;
		let mod = false,
			id,
			title;
		const selectItems = selectedRowKeys.filter((item) => {
			let re = false;
			data1.map((element) => {
				console.log(element.key);
				console.log(item);
				if (element.key == item) {
					if (element.estatus_app === 'Confirmado') {
						re = true;
					} else {
						mod = true;
						id = item;
						title = `El viaje con id ${id} no ha sido confirmado. ¿Quieres continuar?`;
					}
				}
				return element;
			});
			return re;
		});
		if (mod) {
			confirm({
				title,
				icon: <ExclamationCircleOutlined />,
				okText: 'Si',
				cancelText: 'No',
				onOk: () => {
					this.handleChange1(id, 'Confirmado', 'estatus_app');
					this.onSelectChange1(selectedRowKeys);
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		}
		this.setState({ selectedRowKeys: selectItems });
	};

	onSelectChange2 = (selectedRowKeys) => {
		const { data2 } = this.state;
		let mod = false,
			id,
			title,
			idViaje;
		const selectItems2 = selectedRowKeys.filter((item) => {
			let re = false;
			data2.map((element) => {
				if (element.key == item) {
					if (element.estatus_app === 'Confirmado') {
						re = true;
					} else {
						mod = true;
						idViaje = element.id;
						title = `El viaje con id ${idViaje} no ha sido confirmado. ¿Quieres continuar?`;
					}
				}
				return element;
			});
			return re;
		});
		if (mod) {
			confirm({
				title,
				icon: <ExclamationCircleOutlined />,
				okText: 'Si',
				cancelText: 'No',
				onOk: () => {
					/* 
					this.handleChange(id, 'Aprobado', 'estatus_operador'); */
					this.handleChange2(idViaje, 'Confirmado', 'estatus_app');
					/* this.handleChange(id, this.estatus('Aprobado'), 'app'); */
					this.onSelectChange2(selectedRowKeys);
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		}
		this.setState({ selectedRowKeys: selectItems2 });
	};
	confirmaViaje = () => {
		const { selectedRowKeys, data1 } = this.state;
		let viajeDeleteArray,
			request = [];
		selectedRowKeys.map((item) => {
			data1.map((element) => {
				if (element.key === item) {
					request.push({
						idViaje: element.key,
						estatus_app: 'Pendiente',
						estatus: 'Pendiente',
					});
				}
				return element;
			});
			return item;
		});
		console.log(request);
		solicitaViaje(request).then((response) => {
			if (response.headerResponse.code === 400) {
				message.error('No puedes mandar campos vacios ' + response.payload.Faltantes);
			}
			if (response.headerResponse.code === 200) {
				message.success('Viaje confirmado exitosamente');
				viajeDeleteArray = response.payload;
				viajeDeleteArray.map((viajeD) => {
					const viajeDelete = viajeD.sqlEstatusUpdate;
					const { data1 } = this.state;
					this.setState({
						data1: data1.filter((via) => viajeDelete !== via.key),
					});
					return viajeD;
				});
			}
		});
	};
	confirmaViaje2 = () => {
		const { selectedRowKeys, data2 } = this.state;
		let viajeDeleteArray,
			request = [];
		selectedRowKeys.map((item) => {
			data2.map((element) => {
				if (element.key === item) {
					request.push({
						idViaje: element.key,
						estatus_app: 'Pendiente',
						estatus: 'Pendiente',
					});
				}
				return element;
			});
			return item;
		});
		console.log(request);
		solicitaViaje(request).then((response) => {
			if (response.headerResponse.code === 400) {
				message.error('No puedes mandar campos vacios ' + response.payload.Faltantes);
			}
			if (response.headerResponse.code === 200) {
				message.success('Viaje confirmado exitosamente');
				viajeDeleteArray = response.payload;
				viajeDeleteArray.map((viajeD) => {
					const viajeDelete = viajeD.sqlEstatusUpdate;
					const { data2 } = this.state;
					this.setState({
						data2: data2.filter((via) => viajeDelete !== via.key),
					});
					return viajeD;
				});
			}
		});
	};
	render() {
		const {
			data1,
			data2,
			columns1,
			columns2,
			loading1,
			selectedRowKeys,
			loading2,
			total1,
			total2,
			sin_atender1,
			sin_atender2,
			sin_operador1,
			sin_operador2,
			sin_estatus1,
			sin_estatus2,
		} = this.state;
		const hasSelected1 = selectedRowKeys.length > 0;
		const hasSelected2 = selectedRowKeys.length > 0;
		console.log(selectedRowKeys);
		return (
			<Fragment>
				<Content>
					<Layout style={{ padding: '24px 24px', background: '#fff' }}>
						<div style={{ marginBottom: 16 }}>
							<Button
								type="primary"
								onClick={this.confirmaViaje}
								disabled={!hasSelected1}
								loading={loading1}
							>
								PLANEAR
							</Button>
							<span style={{ marginLeft: 8 }}>
								{hasSelected1
									? `Seleccionado ${selectedRowKeys.length} viajes`
									: ''}
							</span>
						</div>
						<Table
							rowSelection={{
								type: 'checkbox',
								selectedRowKeys,
								onChange: this.onSelectChange1,
							}}
							className="components-table-demo-nested"
							columns={columns1}
							title={() => (
								<div>
									<Tag color="#f50">{sin_estatus1} POR CONFIRMAR</Tag>
									<Tag color="#2db7f5">{sin_operador1} POR ASIGNAR</Tag>
									<Tag color="#87d068">{sin_atender1} SIN ATENDER</Tag>
									<Tag color="#108ee9">{total1} TOTAL</Tag>
								</div>
							)}
							dataSource={data1}
							loading={loading1}
							expandedRowRender={this.expandedRowRender1}
							bordered
							pagination={{ position: 'top' }}
						/>
					</Layout>

					<Layout style={{ padding: '24px 24px', background: '#fff' }}>
						<div style={{ marginBottom: 16 }}>
							<Button
								type="primary"
								onClick={this.confirmaViaje2}
								disabled={!hasSelected2}
								loading={loading2}
							>
								PLANEAR
							</Button>
							<span style={{ marginLeft: 8 }}>
								{hasSelected2
									? `Seleccionado ${selectedRowKeys.length} viajes`
									: ''}
							</span>
						</div>
						<Table
							rowSelection={{
								type: 'checkbox',
								selectedRowKeys,
								onChange: this.onSelectChange2,
							}}
							className="components-table-demo-nested"
							columns={columns2}
							title={() => (
								<div>
									<Tag color="#f50">{sin_estatus2} POR CONFIRMAR</Tag>
									<Tag color="#2db7f5">{sin_operador2} POR ASIGNAR</Tag>
									<Tag color="#87d068">{sin_atender2} SIN ATENDER</Tag>
									<Tag color="#108ee9">{total2} TOTAL</Tag>
								</div>
							)}
							dataSource={data2}
							loading={loading2}
							expandedRowRender={this.expandedRowRender2}
							bordered
							pagination={{ position: 'top' }}
						/>
					</Layout>
				</Content>
			</Fragment>
		);
	}
}
export default Solicitudes;
