import React, { Component } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import { PanelHeader, Panel, Div, Placeholder, Root, Button, PanelHeaderBack, Input, FormLayout, Card, SimpleCell, Textarea, Separator, Checkbox } from '@vkontakte/vkui';
import { Icon56AddCircleOutline, Icon56GalleryOutline } from '@vkontakte/icons';

class App extends Component {
	state = {
		activePanel: 'home',
		form: {

		},
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
						<PanelHeader>Подкасты</PanelHeader>
						<Placeholder action={<Button onClick={() => this.go('create_podcats_1')}>Добавить подкаст</Button>} header="Добавьте первый подкаст" icon={<Icon56AddCircleOutline />} stretched>
							Добавляйте, редактируйте и делитесь подкастами вашего сообщества.
						</Placeholder>
					</Panel>

					<Panel id='create_podcats_1'>
						<PanelHeader left={<PanelHeaderBack onClick={() => this.go('home')}/>}>Новый подкаст</PanelHeader>
						<SimpleCell disabled before={<Card mode='tint'><div><Icon56GalleryOutline fill="var(--accent)"/></div></Card>}>
							<FormLayout><Input placeholder='Введите название подкаста' top="Название"/></FormLayout>
						</SimpleCell>
						<FormLayout>
							<Textarea top="Описание подкаста"/>
						</FormLayout>
						<Div>
							<Placeholder action={<Button mode='outline'>Загрузить файл</Button>} header="Загрузите Ваш подкаст">Выберите готовый аудиофайл из вашего телефона и добавьте его</Placeholder>
						</Div>
						<Separator />
						<FormLayout>
							<Checkbox>Ненормативный контент</Checkbox>
							<Checkbox>Исключить эпизод из экспорта</Checkbox>
							<Checkbox defaultChecked>Трейлер подкаста</Checkbox>
						</FormLayout>
						<SimpleCell description="Всем пользователям">Кому доступен данный подкаст</SimpleCell>
						<SimpleCell multiline description="При публикации записи с эпизодом, он становится доступным для всех пользователей">
						</SimpleCell>
						<Div>
							<Button size='xl'>Дальше</Button>
						</Div>
					</Panel>
				</View>
			</Root>
		)
	}
}

export default App;

