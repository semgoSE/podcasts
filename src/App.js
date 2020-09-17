import React, { Component } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends Component {
	state = {
		activePanel: 'home',
	
	}

	go = (activePanel) => {
		this.setState({ activePanel})
	}

	render() {
		const { user, activePanel} = this.state;
		return (
			<Root>
				<View activePanel={activePanel}>
					<Panel id='home'>
			
					</Panel>
				</View>
			</Root>
		)
	}
}

export default App;

