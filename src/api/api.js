import { orderByChild, query, ref, get, push, set, remove } from 'firebase/database';
import { NEW_TODO_ID } from '../constants';
import { db } from '../firebase';

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

export const createTodo = async (data) => {
	const { key } = await push(ref(db, 'todos'), data);
	return key;
};
export const deleteTodo = (id) => {
	return remove(ref(db, `todos/${id}`));
};
