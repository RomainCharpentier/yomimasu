import * as types from './ActionTypes'

export const addBook = (text, cat = 'default') => ({
	type: types.ADD_BOOK,
	text,
	cat,
});
export const removeBook = (id, cat) => ({
	type: types.REMOVE_BOOK,
	id,
	cat
});
export const setVisibilityFilter = (filter) => ({
	type: types.SET_VISIBILITY_FILTER,
	filter
});