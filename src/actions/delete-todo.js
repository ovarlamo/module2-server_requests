import { deleteTodo } from '../api/api';
export const deleteTodoAction = (id) => (dispatch) => {
	deleteTodo(id).then(() => {
		dispatch({ type: 'DELETE_TODO', payload: id });
	});
};
