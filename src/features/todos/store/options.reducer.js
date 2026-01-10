const initialState = {
	isSort: false,
	searchStr: '',
};
export const optionsReducer = (state = initialState, action) => {
	console.log('optionsReducer', action);
	switch (action.type) {
		case 'SET_IS_SORT':
			return {
				...state,
				isSort: action.payload,
			};
		case 'SET_SEARCH_STR':
			return {
				...state,
				searchStr: action.payload,
			};
		default:
			return state;
	}
};
export default optionsReducer;
