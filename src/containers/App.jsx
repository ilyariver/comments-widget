import React from 'react'
import { Container, Box, TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import styled from 'styled-components'
import { CommentList } from '@components/CommentList'
import { Empty } from '../common/Empty'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	actionChangeName,
	actionChangeCommentText,
	actionAddCommentPost,
	actionRemoveComment
} from '../redux/reducers/AddComment'

const PageTitle = styled.h1`
	margin: 0 0 25px 0;
	padding: 0 20px;
`

const CommentsWrap = styled.div`
  height: 60vh;
  background-color: #a4e6e6;
  margin-bottom: 10px;
  padding: 40px 20px;
	border-top: 1px solid #a4e6e6;
	border-bottom: 1px solid #a4e6e6;
  overflow-x: auto;
`

const SendWrap = styled.div`
  display: flex;
`

const mapStateToProps = state => {
	return {
		newNameChange: state.newNameChange,
		newCommentChange: state.newCommentChange,
		posts: state.posts,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		changeName: bindActionCreators(actionChangeName, dispatch),
		changeCommentText: bindActionCreators(actionChangeCommentText, dispatch),
		addCommentPost: bindActionCreators(actionAddCommentPost, dispatch),
		removeComment: bindActionCreators(actionRemoveComment, dispatch),
	}
}

const App = props => {
	const {
		newNameChange,
		newCommentChange,
		posts,
		changeName,
		changeCommentText,
		addCommentPost,
		removeComment
	} = props

	function handleSubmit(e) {
		e.preventDefault()
		return addCommentPost()
	}

	return (
		<div>
			<PageTitle>Комментарии</PageTitle>

			<CommentsWrap>
				<Container maxWidth="md">
					{ posts.length !== 0 ? posts.map(post => <CommentList
						removeComment={removeComment}
						post={post}
						key={ post.id }/>) : <Empty /> }
				</Container>
			</CommentsWrap>

			<Box
				onSubmit={handleSubmit}
				component="form"
	      sx={{
					width: '500px',
					margin: '0 auto',
					paddingBottom: '3rem',
					'& .MuiTextField-root': { m: 1, width: '72ch' },
					'& .MuiTextField-root:last-child': { m: 1, width: '25ch' },
					'& .MuiButton-root': { m: 1, width: '25ch' }
	      }}>

				<TextField
					value={newNameChange}
					onChange={event => changeName(event.target.value)}
					label="Ваше имя"
					variant="outlined" />

				<SendWrap>
					<TextField
						value={newCommentChange}
						onChange={event => changeCommentText(event.target.value)}
						label="Комментарий"
						variant="outlined" />
					<Button
						type="submit"
						endIcon={ <SendIcon /> }
						variant="contained"
					>Отправить</Button>
				</SendWrap>

			</Box>

		</div>
	)
}

export const MainComponent = connect(mapStateToProps, mapDispatchToProps)(App)
