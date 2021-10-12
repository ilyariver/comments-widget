import React from 'react'

class InputText extends React.Component {
	constructor(props) {
		super(props)
		this.handleTextArea = this.handleTextArea.bind(this)
	}

	handleTextArea(event) {
		this.props.onChangeTextArea(event.target.value)
	}

	renderDialog() {
		const props = this.props
		this.props.createMessage({props})
	}

	render() {
		return (
			<input
				value={this.props.textAreaValue}
				onChange={this.handleTextArea}
				type="text"
				className="text-area__text-input"
				placeholder="Введите комментарий..."
				onKeyUp={event => {
					if (event.key === 'Enter') {
						this.renderDialog()
					}
				}}
			/>
		)
	}
}

export default InputText
