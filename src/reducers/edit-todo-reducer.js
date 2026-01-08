const initEditTodoState = {
	id: null,
	name: '',
	finished: false,
	isEdit: false,
};
export const editTodoReducer = (state = initEditTodoState, action) => {
	switch (action.type) {
		case 'SET_EDIT_TODO':
			return { ...state, ...action.payload };
		case 'CLEAR_EDIT_TODO':
			return initEditTodoState;
		case 'UPDATE_TODO':
			if (state.id === action.payload.id) {
				return { ...state, ...action.payload, isEdit: false };
			} else {
				return state;
			}
		default:
			return state;
	}
};
export default editTodoReducer;
