import React from 'react'

class Dialogs extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<li className="message">
				<div className="message__name">{this.props.message.Title}</div>
				<div className="message__body">{this.props.message.Text}</div>
				<div className="message__date">{this.props.message.Date}</div>
				<button
					className="message__remove-btn"
					onClick={this.props.removeMessageHandler}>x
				</button>
			</li>
		)
	}
}

export default Dialogs
