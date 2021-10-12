import React from 'react'

class InputName extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputTitle = this.handleInputTitle.bind(this)
	}

	handleInputTitle(event) {
		this.props.onChangeInputTitle(event.target.value)
	}

	renderDialog() {
		const props = this.props
		this.props.createMessage({props})
	}

	render() {
		return (
			<input
				value={this.props.titleText}
				onChange={this.handleInputTitle}
				type="text"
				className="text-area__name-input"
				placeholder="Введите имя..."
				onKeyUp={event => {
					if (event.key === 'Enter') {
						this.renderDialog()
					}
				}}
			/>
		)
	}
}

export default InputName
