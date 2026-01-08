export const setSearchStr = (value) => (dispatch) => {
	dispatch({ type: 'SET_SEARCH_STR', payload: value });
};
