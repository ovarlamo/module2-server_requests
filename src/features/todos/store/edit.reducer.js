const initialState = {
	id: null,
	name: '',
	finished: false,
	isEdit: false,
};
export const editTodoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_EDIT_TODO':
			return { ...state, ...action.payload };
		case 'CLEAR_EDIT_TODO':
			return initialState;

		default:
			return state;
	}
};
export default editTodoReducer;
