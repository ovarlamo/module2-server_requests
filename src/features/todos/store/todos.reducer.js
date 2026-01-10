const initialState = {
	items: [],
	loading: false,
	error: null,
};
export const todosReducer = (state = initialState, action) => {
	console.log('todosReducer', action);
	switch (action.type) {
		case 'SET_TODOS':
			return {
				...state,
				items: action.payload,
			};
		case 'ADD_TODO':
			const newTodo = action.payload || {
				id: 'NEW_TODO_ID',
				name: '',
				isEdit: true,
				finished: false,
			};
			return {
				...state,
				items: [...state.items, newTodo],
			};
		case 'DELETE_TODO':
			return {
				...state,
				items: state.items.filter((todo) => todo.id !== action.payload),
			};
		case 'UPDATE_TODO':
			return {
				...state,
				items: state.items.map((todo) =>
					todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
				),
			};

		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload,
			};
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
