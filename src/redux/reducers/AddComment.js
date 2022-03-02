import { randomColors } from '../../common/colors'
import { getFirstLetters } from '../../common/getFirstLetters'

const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_COMMENT_TEXT = 'CHANGE_COMMENT_TEXT'
const ADD_COMMENT_POST = 'ADD_COMMENT_POST'
const REMOVE_COMMENT = 'REMOVE_COMMENT'

const initialState = {
	newNameChange: '',
	newCommentChange: '',
	posts: [
		{
			id: 1,
			avatar: 'https://w7.pngwing.com/pngs/980/886/png-transparent-male-portrait-avatar-computer-icons-icon-design-avatar-flat-face-icon-people-head-cartoon.png',
			avatarText: null,
			color: null,
			name: 'Стив Бушеми',
			commentText: 'По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей ' +
				'недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит ' +
				'любой макет непонятным смыслом и придаст неповторимый колорит советских времен.',
			time: '2.03.2022 01:33'
		}
	]
}

export const rootReducer = (state = initialState, action) => {
	const post = {
		id: new Date().getMilliseconds(),
		avatar: null,
		avatarText: getFirstLetters(state.newNameChange),
		color: randomColors(),
		name: state.newNameChange,
		commentText: state.newCommentChange,
		time: new Date().toLocaleString('ru-RU', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	switch (action.type) {
		case CHANGE_NAME:
			return { ...state, newNameChange: action.payload  }
		case CHANGE_COMMENT_TEXT:
			return { ...state, newCommentChange: action.payload  }
		case ADD_COMMENT_POST:
			if (!state.newNameChange.trim() || !state.newCommentChange.trim()) return state
			return {
				...state,
				posts:	[post, ...state.posts],
				newNameChange: '',
				newCommentChange: ''
			}
		case REMOVE_COMMENT:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.payload)
			}
		default:
			return state
	}
}

// actions
export const actionChangeName = name => ({type: CHANGE_NAME, payload: name})
export const actionChangeCommentText = text => ({type: CHANGE_COMMENT_TEXT, payload: text})
export const actionAddCommentPost = () => ({type: ADD_COMMENT_POST})
export const actionRemoveComment = id => ({type: REMOVE_COMMENT, payload: id})
