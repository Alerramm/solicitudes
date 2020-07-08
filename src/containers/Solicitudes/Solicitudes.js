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
} from 'antd';
import { consultaViajes } from './SolicitudesActions';
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
		loading: false,
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
	handleChange = (id, value, columna) => {
		const { data } = this.state;
		data.map((viaje) => {
			if (id === viaje.key) {
				viaje[columna] = value;
			}
			return viaje;
		});
		this.setState({
			data,
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
			loading: true,
		});
		let columns1 = [
			{
				title: 'GRUPO 1',
				children: [
					{
						title: 'ESTATUS',
						dataIndex: 'estatus_app',
						key: 'estatus_app',
						render: (record) => {
							return this.estatus(record);
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
							return this.estatus(record);
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
				total1: 0,
				total2: 0,
				sin_atender1: 0,
				sin_atender2: 0,
				sin_operador1: 0,
				sin_operador2: 0,
				sin_estatus1: 0,
				sin_estatus2: 0,
				data1: viajes.G1.viajes,
				data2: viajes.G2.viajes,
				loading: false,
			});
		});
	};

	onSelectChange = (selectedRowKeys) => {
		const { data } = this.state;
		let mod = false,
			id,
			operador,
			cliente,
			title,
			empresa,
			titleOperador = '',
			titleEmpresa = '';
		const selectItems = selectedRowKeys.filter((item) => {
			let re = false;
			data.map((element) => {
				if (element.key === item) {
					if (
						element.estatus_operador === 'Aprobado' &&
						element.estatus_empresa === 'Confirmado'
					) {
						re = true;
					} else {
						mod = true;
						id = item;
						operador = element.operador;
						cliente = element.cliente;
						empresa = element.empresa;
						if (element.estatus_operador !== 'Aprobado') {
							titleOperador = ` -El conductor ${operador} `;
						}
						if (element.estatus_empresa !== 'Confirmado') {
							titleEmpresa = ` -La empresa ${empresa} `;
						}
						title = `Los estatus de ${titleOperador}${titleEmpresa} no ha aceptado el viaje del cliente ${cliente}. ¿Quieres continuar?`;
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
					this.handleChange(id, 'Aprobado', 'estatus_operador');
					this.handleChange(id, 'Confirmado', 'estatus_empresa');
					/* this.handleChange(id, this.estatus('Aprobado'), 'app'); */
					this.onSelectChange(selectedRowKeys);
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		}
		this.setState({ selectedRowKeys: selectItems });
	};
	confirmaViaje = () => {
		const { selectedRowKeys, data } = this.state;
		let viajeDeleteArray,
			request = [];
		selectedRowKeys.map((item) => {
			data.map((element) => {
				if (element.key === item) {
					request.push({
						idViaje: element.key,
						precio: element.precio,
						gastos: [
							{
								tipo: 'Diesel',
								presupuesto: element.diesel ? element.diesel : 0,
							},
							{
								tipo: 'Casetas',
								presupuesto: element.casetas ? element.casetas : 0,
							},
							{
								tipo: 'Viaticos',
								presupuesto: element.viaticos ? element.viaticos : 0,
							},
							{
								tipo: 'Comision',
								presupuesto: element.comision ? element.comision : 0,
							},

							{
								tipo: 'Maniobras',
								presupuesto: element.maniobras ? element.maniobras : 0,
							},
							{
								tipo: 'Custodia',
								presupuesto: element.custodia ? element.custodia : 0,
							},
							{
								tipo: 'Externo',
								presupuesto: element.externo ? element.externo : 0,
							},
						],
						diesel: element.diesel ? element.diesel : 0,
						casetas: element.casetas ? element.casetas : 0,
						comision: element.comision ? element.comision : 0,
						viaticos: element.viaticos ? element.viaticos : 0,
						maniobras: element.maniobras ? element.maniobras : 0,
						custodia: element.custodia ? element.custodia : 0,
						externo: element.externo ? element.externo : 0,
					});
				}
				return element;
			});
			return item;
		});
		console.log(request);
		/* confirmaViaje(request).then((response) => {
			if (response.headerResponse.code === 400) {
				message.error('No puedes mandar campos vacios ' + response.payload.Faltantes);
			}
			if (response.headerResponse.code === 200) {
				message.success('Viaje confirmado exitosamente');
				viajeDeleteArray = response.payload;
				viajeDeleteArray.map((viajeD) => {
					const viajeDelete = viajeD.sqlEstatusUpdate;
					const { data } = this.state;
					this.setState({
						data: data.filter((via) => viajeDelete !== via.key),
					});
					return viajeD;
				});
			}
		}); */
	};

	render() {
		const {
			data1,
			data2,
			columns1,
			columns2,
			loading,
			selectedRowKeys,
			total1,
			total2,
			sin_atender1,
			sin_atender2,
			sin_operador1,
			sin_operador2,
			sin_estatus1,
			sin_estatus2,
		} = this.state;
		const hasSelected = selectedRowKeys.length > 0;
		return (
			<Fragment>
				<Content>
					<Layout style={{ padding: '24px 24px', background: '#fff' }}>
						<div style={{ marginBottom: 16 }}>
							<Button
								type="primary"
								onClick={this.confirmaViaje}
								disabled={!hasSelected}
								loading={loading}
							>
								PLANEAR
							</Button>
							<span style={{ marginLeft: 8 }}>
								{hasSelected ? `Seleccionado ${selectedRowKeys.length} viajes` : ''}
							</span>
						</div>
						<Table
							rowSelection={{
								type: 'checkbox',
								selectedRowKeys,
								onChange: this.onSelectChange,
							}}
							className="components-table-demo-nested"
							title={() => 'Header1'}
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
							loading={loading}
							expandedRowRender={this.expandedRowRender1}
							bordered
							pagination={{ position: 'top' }}
						/>
					</Layout>

					<Layout style={{ padding: '24px 24px', background: '#fff' }}>
						<div style={{ marginBottom: 16 }}>
							<Button
								type="primary"
								onClick={this.confirmaViaje}
								disabled={!hasSelected}
								loading={loading}
							>
								PLANEAR
							</Button>
							<span style={{ marginLeft: 8 }}>
								{hasSelected ? `Seleccionado ${selectedRowKeys.length} viajes` : ''}
							</span>
						</div>
						<Table
							rowSelection={{
								type: 'checkbox',
								selectedRowKeys,
								onChange: this.onSelectChange,
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
							loading={loading}
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
