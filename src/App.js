import React, { Component } from 'react';
import { Layout } from 'antd';
import PageHeaders from './components/PageHeader/PageHeader';
import Solicitudes from './containers/Solicitudes/Solicitudes';
import Analitycs from './containers/Analitycs/Analitycs';

import './App.css';
import 'antd/dist/antd.css';
const { Content } = Layout;
class App extends Component {
	state = {
		collapsed: true,
		opcion: 'tabla',
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};
	option = (e) => {
		this.setState({
			opcion: e.item.props.name,
		});
	};

	render() {
		const { opcion } = this.state;
		return (
			<Layout>
				<PageHeaders />
				<Content>
					{opcion === 'tabla' && <Solicitudes />}
					{opcion === 'analitycs' && <Analitycs />}
				</Content>
			</Layout>
		);
	}
}

export default App;
