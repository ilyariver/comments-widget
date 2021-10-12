import React from 'react'

class SendButton extends React.Component {
	constructor(props) {
		super(props)
		this.compilationInputs = this.compilationInputs.bind(this)
	}

	renderSendData() {
		const props = this.props
		this.props.createMessage({props})
	}

	compilationInputs(event) {
		event.preventDefault()
		this.renderSendData()
	}

	render() {
		return (
			<button
				type={'submit'}
				onClick={this.compilationInputs}
				className="text-area__send-button">
				Отправить</button>
		)
	}
}

export default SendButton
