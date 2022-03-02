import React from 'react'

export const Empty = ({ text }) => {
	return (
		<h2>{ text || 'Комментариев нет...' }</h2>
	)
}
