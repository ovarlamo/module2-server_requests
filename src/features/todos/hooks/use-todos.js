import { useSelector, useDispatch } from 'react-redux';
import { loadTodos, saveTodo, removeTodo } from '../store/todos.thunks';
import {
	selectEditTodo,
	selectIsSort,
	selectSearch,
	selectTodos,
} from '../store/todos.selectors';
export const useTodos = () => {
	const todos = useSelector(selectTodos);

	const dispatch = useDispatch();

	return {
		todos,
		isSort: useSelector(selectIsSort),
		searchStr: useSelector(selectSearch),
		editTodo: useSelector(selectEditTodo),
		loadTodos: (isSort, searchStr) => dispatch(loadTodos(isSort, searchStr)),
		saveTodo: (id, data) => dispatch(saveTodo(id, data)),
		removeTodo: (id) => dispatch(removeTodo(id)),
		setIsSort: (isSort) => dispatch({ type: 'SET_IS_SORT', payload: isSort }),
		setSearchStr: (str) => dispatch({ type: 'SET_SEARCH_STR', payload: str }),
		addTodo: () => dispatch({ type: 'ADD_TODO' }),

		toggleTodoFinished: (id, name, finished) =>
			dispatch(saveTodo(id, { id, name, finished })),
	};
};
