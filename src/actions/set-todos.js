export const setTodos = (todos) => (dispatch) => {
	dispatch({ type: 'SET_TODOS', payload: todos });
};
