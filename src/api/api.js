import { orderByChild, query, ref, get, push, set, remove } from 'firebase/database';
import { NEW_TODO_ID } from '../constants';
import { db } from '../firebase';

const fetchServer = (method = 'GET', id, payload, params) => {
	const { isSort, searchInput } = params || { isSort: false, searchInput: '' };
	const url =
		'http://localhost:3005/todos' +
		(id !== NEW_TODO_ID && id !== undefined ? `/${id}` : '') +
		'?_sort=' +
		(isSort ? 'name' : 'id') +
		(searchInput !== '' ? `&name_like=${encodeURIComponent(searchInput)}` : '');

	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body: payload ? JSON.stringify(payload) : null,
	});
};

export const getTodos = (isSort = false, searchInput = '') => {
	const dbRef = ref(db, 'todos');

	return get(query(dbRef, orderByChild(isSort ? 'name' : 'id'))).then((snapshot) => {
		let loadedTodos = [];
		snapshot.forEach((element) => {
			const { name, finished } = element.val();
			loadedTodos.push({ id: element.key, name, finished });
		});
		if (searchInput) {
			loadedTodos = loadedTodos.filter((todo) =>
				todo.name.toLowerCase().includes(searchInput.toLowerCase()),
			);
		}
		return loadedTodos;
	});
};
export const updateTodo = (id, data) => {
	return set(ref(db, `todos/${id}`), data);
};

export const createTodo = (data) => {
	return push(ref(db, 'todos'), data).then(({ key }) => key);
};
export const deleteTodo = (id) => {
	return remove(ref(db, `todos/${id}`));
};
