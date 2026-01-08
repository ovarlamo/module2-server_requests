import { updateTodo } from '../api/api';
import { NEW_TODO_ID } from '../constants';
import { createTodo } from '../api/api';
export const saveTodoAction = (id, name, finished) => (dispatch) => {
	if (id === NEW_TODO_ID) {
		createTodo({ name, finished }).then(({ id }) => {
			dispatch({ type: 'DELETE_TODO', payload: NEW_TODO_ID });
			dispatch({
				type: 'ADD_TODO',
				payload: { id, name, finished, isEdit: false },
			});
		});
	} else {
		updateTodo(id, { name, finished }).then(() => {
			dispatch({
				type: 'UPDATE_TODO',
				payload: { id, name, finished, isEdit: false },
			});
		});
	}
};
