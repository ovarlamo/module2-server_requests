import { NEW_TODO_ID } from '../constants';
const fetchServer = (method = 'GET', id, payload) => {
	const url =
		'http://localhost:3005/todos1' +
		(id !== NEW_TODO_ID && id !== undefined ? `/${id}` : '');
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body: payload ? JSON.stringify(payload) : null,
	});
};

export const getTodos = () => {
	return fetchServer().then((response) => response.json());
};
export const updateTodo = (id, data) => {
	return fetchServer('PUT', id, data).then((response) => response.json());
};

export const createTodo = (data) => {
	return fetchServer('POST', NEW_TODO_ID, data).then((response) => response.json());
};
export const deleteTodo = (id) => {
	return fetchServer('DELETE', id).then((response) => response.json());
};
