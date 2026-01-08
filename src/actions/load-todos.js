import { getTodos } from '../api/api';
export const loadTodos = (isSort, searchInput) => (dispatch) => {
	getTodos(isSort, searchInput).then((todos) =>
		dispatch({ type: 'SET_TODOS', payload: todos }),
	);
};
