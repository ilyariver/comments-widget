import React from 'react'
import * as ReactDom from 'react-dom'
import '../src/assets/scss/main'
import Dialogs from './components/dialog/dialogs'
import InputName from './components/inputs/input-name'
import SendButton from './components/button/send-button'
import InputText from './components/inputs/input-text'


class App extends React.Component {
	constructor() {
		super()
		const store = localStorage.getItem('message')

		this.state = {
			messages: store != null ? JSON.parse(store) : [],
			titleText: '',
			textAreaValue: '',
			messageValue: '',
			localStorageMessages: localStorage.getItem('message'),
		}
		this.changeInputTitle = this.changeInputTitle.bind(this)
		this.changeTextArea = this.changeTextArea.bind(this)
		this.sendButtonMessage = this.sendButtonMessage.bind(this)
		this.removeMessageHandler = this.removeMessageHandler.bind(this)
		this.createMessage = this.createMessage.bind(this)
	}

	changeInputTitle(inputName) {
		this.setState({titleText: inputName})
	}

	changeTextArea(textArea) {
		this.setState({textAreaValue: textArea})
	}

	sendButtonMessage(message) {
		const currentMessage = this.state.messages
		currentMessage.unshift(message)
		const toJson = JSON.stringify(currentMessage)
		if (!toJson) return
		this.setState({
			localStorageMessages: toJson,
			titleText: '',
			textAreaValue: '',
		})
	}

	removeMessageHandler(event, index) {
		event.preventDefault()
		const currentMessages = this.state.messages.filter((item, i) => i !== index)
		const toJson = JSON.stringify(currentMessages)
		this.setState({
			messages: currentMessages,
			localStorageMessages: toJson,
		})
	}

	createMessage(current) {
		if (!current.props.titleText.trim() || !current.props.textAreaValue.trim()) {
			alert('Поля не заполнены!')
			return
		}

		current.props.sendButtonMessage(
			{
				id: current.props.messages.length + 1,
				Title: current.props.titleText,
				Text: current.props.textAreaValue,
				Date: new Date().toLocaleDateString('ru-RU', {
					hour: '2-digit',
					minute: '2-digit',
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				})
			}
		)
	}

	render() {
		const {localStorageMessages, messages} = this.state
		if (messages !== null && messages !== undefined) {
			localStorage.setItem('message', localStorageMessages)
		}

		return (
			<div className="main">
				<h1 className="main__title">Комментарии</h1>
				<div className="main__body">
					<div className="text-area">
						{messages < 1 && <div className="text-area__empty-message">Комментариев нет...</div>}
						<ul className="text-area__dialogs">
							{messages && messages.map((message, i) => {
								return <Dialogs
									key={message.Title + i}
									message={message}
									removeMessageHandler={event => this.removeMessageHandler(event, i)}/>
							})}
						</ul>

						<InputName
							titleText={this.state.titleText}
							messages={this.state.messages}
							textAreaValue={this.state.textAreaValue}
							onChangeInputTitle={this.changeInputTitle}
							sendButtonMessage={this.sendButtonMessage}
							createMessage={this.createMessage}
						/>
						<div className="text-area__message-wrap">
							<InputText
								messages={this.state.messages}
								titleText={this.state.titleText}
								textAreaValue={this.state.textAreaValue}
								onChangeTextArea={this.changeTextArea}
								sendButtonMessage={this.sendButtonMessage}
								createMessage={this.createMessage}
							/>
							<SendButton
								messages={this.state.messages}
								titleText={this.state.titleText}
								textAreaValue={this.state.textAreaValue}
								sendButtonMessage={this.sendButtonMessage}
								createMessage={this.createMessage}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ReactDom.render(
	<App/>,
	document.getElementById('app')
)


