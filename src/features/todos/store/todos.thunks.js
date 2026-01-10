import { fetchTodos, putTodo, deleteTodo, postTodo } from '../services/todos.api';
import { NEW_TODO_ID } from 'constants';
export const loadTodos = (isSort, searchStr) => {
	return async (dispatch) => {
		dispatch({ type: 'SET_LOADING', payload: true });
		try {
			const todos = await fetchTodos(isSort, searchStr);
			dispatch({ type: 'SET_TODOS', payload: todos });
		} catch (error) {
			dispatch({ type: 'SET_ERROR', payload: error.message });
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false });
		}
	};
};
export const saveTodo = (id, data) => {
	return async (dispatch) => {
		try {
			if (id === NEW_TODO_ID) {
				const resp = await postTodo({ name: data.name, finished: false });
				dispatch({ type: 'DELETE_TODO', payload: NEW_TODO_ID });
				dispatch({ type: 'ADD_TODO', payload: resp });
			} else {
				const resp = await putTodo(id, data);
				dispatch({ type: 'UPDATE_TODO', payload: resp });
			}
		} catch (error) {
			dispatch({ type: 'SET_ERROR', payload: error.message });
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false });
		}
	};
};
export const removeTodo = (id) => {
	return async (dispatch) => {
		dispatch({ type: 'SET_LOADING', payload: true });
		try {
			await deleteTodo(id);
			dispatch({ type: 'DELETE_TODO', payload: id });
		} catch (error) {
			dispatch({ type: 'SET_ERROR', payload: error.message });
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false });
		}
	};
};
