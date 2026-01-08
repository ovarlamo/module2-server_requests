const initOptionsState = {
	isSort: false,
	searchInput: '',
	searchStr: '',
};
export const optionsReducer = (state = initOptionsState, action) => {
	switch (action.type) {
		case 'SET_IS_SORT':
			return {
				...state,
				isSort: action.payload,
			};
		case 'SET_SEARCH_INPUT':
			return {
				...state,
				searchInput: action.payload,
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
