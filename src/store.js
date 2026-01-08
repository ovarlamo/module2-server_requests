import { createStore, combineReducers, applyMiddleware } from 'redux';
import todosReducer from './reducers/todos-reducer';
import editTodoReducer from './reducers/edit-todo-reducer';
import optionsReducer from './reducers/options-reducer';
import { thunk } from 'redux-thunk';
export default createStore(
	combineReducers({
		todos: todosReducer,
		editTodo: editTodoReducer,
		options: optionsReducer,
	}),
	applyMiddleware(thunk),
);
