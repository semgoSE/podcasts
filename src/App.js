import React, { Component } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import { PanelHeader, Panel, Div, Placeholder, Root, Button, PanelHeaderBack, Input, FormLayout, Card, SimpleCell, Textarea, Separator, Checkbox, Avatar, File, RichCell, Link, Group, Header, Text, List, FixedLayout } from '@vkontakte/vkui';
import { Icon56AddCircleOutline, Icon56CheckCircleOutline, Icon56GalleryOutline } from '@vkontakte/icons';

class App extends Component {
	state = {
		activePanel: 'home',
		form: {
			name: null,
			description: null,
			img:null,
			podcast: {			//здесь хранится подкаст
				timecode: [
					{time: '00:20', title: "Основная тема подкаста"}
				], 	//массив time кодов
				mp3: 'code'		//сам подкаст
			}
		},
	}

	go = (activePanel) => { //смена панелей
		this.setState({ activePanel})
	}

	onChange = (e) => { 
		const { name, value } = e.currentTarget;
		this.setState({ form: { ...this.state.form, [name]: value }});
	}
	
	onChangeFile = (input) => {	//хагрузка картинки
		const { form } = this.state;
		if (input.currentTarget.files && input.currentTarget.files[0]) {
			var reader = new FileReader();
			reader.onload = async (e) => {
			await this.setState({ form:{...form, img: e.target.result}})
			};
			reader.readAsDataURL(input.currentTarget.files[0]);
	}
}

	render() {
		const { user, activePanel, form} = this.state;
		return (
			<Root>
				<View activePanel={activePanel}>
					<Panel id='home'>
						<PanelHeader>Подкасты</PanelHeader>
						<Placeholder action={<Button onClick={() => this.go('create_podcats')}>Добавить подкаст</Button>} header="Добавьте первый подкаст" icon={<Icon56AddCircleOutline />} stretched>
							Добавляйте, редактируйте и делитесь подкастами вашего сообщества.
						</Placeholder>
					</Panel>

					<Panel id='create_podcats'>
						<PanelHeader left={<PanelHeaderBack onClick={() => this.go('home')}/>}>Новый подкаст</PanelHeader>
						<SimpleCell disabled before={form.img  ? <Avatar src={form.img} size={72} mode='image' /> : <File mode='secondary' style={{ height: 72, width:72, display: 'flex', alignItems: 'center', justifyContent: 'center'}} controlSize='m' onChange={this.onChangeFile}><Icon56GalleryOutline width={28} height={28}/></File>}>
							<FormLayout><Input value={form.name} name="name" onChange={this.onChange} placeholder='Введите название подкаста' top="Название"/></FormLayout>
						</SimpleCell>
						<FormLayout>
							<Textarea value={form.description} name="description" onChange={this.onChange} top="Описание подкаста"/>
						</FormLayout>
						<Div>
							<Placeholder action={<File mode='outline'>Загрузить файл</File>} header="Загрузите Ваш подкаст">Выберите готовый аудиофайл из вашего телефона и добавьте его</Placeholder>
						</Div>
						<Separator />
						<FormLayout>
							<Checkbox>Ненормативный контент</Checkbox>
							<Checkbox>Исключить эпизод из экспорта</Checkbox>
							<Checkbox defaultChecked>Трейлер подкаста</Checkbox>
						</FormLayout>
						<SimpleCell expandable description="Всем пользователям">Кому доступен данный подкаст</SimpleCell>
						<SimpleCell multiline description="При публикации записи с эпизодом, он становится доступным для всех пользователей">
						</SimpleCell>
						<Div>
							<Button size='xl' onClick={() => this.go('snippet')} disabled={form.img == '' || form.name == '' || form.description == '', form.podcast.mp3 == ''}>Дальше</Button>
						</Div>
					</Panel>

					<Panel id='snippet'>
						<PanelHeader left={<PanelHeaderBack onClick={() => this.go('create_podcats')}/>}>Новый подкаст</PanelHeader>
						<Group>
							<RichCell text={<Link>ПараDogs</Link>} caption={"Длительность: 59:16"} before={<Avatar size={72} mode='image' src={form.img}/>}>
								{form.name}
							</RichCell>
						</Group>
						<Group header={<Header>Описание</Header>}>
							<Div style={{ paddingTop: 0}}>
								<Text>
								{form.description}
								</Text>
							</Div>
						</Group>
						<Group header={<Header>Содержание</Header>}>
							<List>
								{form.podcast.timecode.map(timecode => 
									<SimpleCell><Link>{timecode.time}</Link> — {timecode.title}</SimpleCell>
								)}
							</List>
							
						</Group>
						
						<FixedLayout vertical='bottom'>
							<Separator />
							<Div>
								<Button size='xl' onClick={() => this.go('publish')}>Опубликовать подкаст</Button>
							</Div>
						</FixedLayout>
					</Panel>

					<Panel id='publish'>
							<PanelHeader>Подкасты</PanelHeader>
							<Placeholder action={<Button>Поделиться подкастом</Button>} icon={<Icon56CheckCircleOutline fill="var(--accent)"/>} header="Подкаст добавлен" stretched>
							Раскажите своим подписчикам о новом подкасте, чтобы получить больше слушателей.
							</Placeholder>
					</Panel>
				</View>
			</Root>
		)
	}
}

export default App;

