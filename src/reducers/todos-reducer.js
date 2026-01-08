import { NEW_TODO_ID } from '../constants';
const initTodosState = [];
export const todosReducer = (state = initTodosState, action) => {
	console.log('todosReducer', action);
	switch (action.type) {
		case 'SET_TODOS':
			return action.payload;
		case 'ADD_TODO':
			const newTodo = action.payload || {
				id: NEW_TODO_ID,
				name: '',
				isEdit: true,
				finished: false,
			};
			return [...state, newTodo];
		case 'DELETE_TODO':
			return state.filter((todo) => todo.id !== action.payload);
		case 'UPDATE_TODO':
			return state.map((todo) =>
				todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
			);

		default:
			return state;
	}
};
export default todosReducer;
