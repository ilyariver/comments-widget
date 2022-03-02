export const getFirstLetters = name => {
	return name
	.split(' ')
	.map((word, i) => i < 2 ? word.charAt(0) : '')
	.join('')
	.toUpperCase()
}
