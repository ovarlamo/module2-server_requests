const EndPoint = 'http://localhost:3005/todos';
export const todosApi = {
	fetchTodos: async (isSort = false, searchStr = '') => {
		const url =
			EndPoint +
			'?_sort=' +
			(isSort ? 'name' : 'id') +
			(searchStr !== '' ? `&name_like=${encodeURIComponent(searchStr)}` : '');
		console.log(url);
		const response = await fetch(url);
		return response.json();
	},
	putTodo: async (id, data) => {
		console.log('putTodo', data);
		const response = await fetch(EndPoint + `/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
			body: JSON.stringify(data),
		});
		return response.json();
	},
	postTodo: async (data) => {
		console.log('postTodo', data);
		const response = await fetch(EndPoint, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response.json();
	},
	deleteTodo: async (id) => {
		console.log('deleteTodo', id);
		const response = await fetch(EndPoint + `/${id}`, {
			method: 'DELETE',
			body: null,
		});
		return response.json();
	},
};
export const fetchTodos = todosApi.fetchTodos;
export const putTodo = todosApi.putTodo;
export const deleteTodo = todosApi.deleteTodo;
export const postTodo = todosApi.postTodo;
