import React from 'react'
import { Avatar, Grid, Paper, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import styled from 'styled-components'

const Text = styled.p`
`

const Time = styled.small`
  display: block;
  color: grey;
	text-align: end;
`

export const CommentList = ({ post, removeComment }) => {
	return (
		<Paper style={{ marginBottom: '30px' }}>
			<Grid container spacing={2} wrap="nowrap" style={{ padding:'15px 25px' }}>
				<Grid item>
					<Avatar
						alt={post.name}
						src={ post.avatar }
						sx={{ bgcolor: post.color }}
					>{ post.avatarText }</Avatar>
				</Grid>
				<Grid item style={{ width: '100%' }}>
					<h2 style={{ margin: 0 }}>{ post.name }</h2>
					<Text>{ post.commentText }</Text>
					<Time>{ post.time }</Time>
				</Grid>
				<div>
					<IconButton onClick={() => removeComment(post.id)}>
						<ClearIcon />
					</IconButton>
				</div>
			</Grid>
		</Paper>
	)
}
