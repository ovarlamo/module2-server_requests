import { combineReducers } from 'redux';
import { todosReducer } from './todos.reducer';
import { optionsReducer } from './options.reducer';
import editTodoReducer from './edit.reducer';
export const todosFeatureReducer = combineReducers({
	list: todosReducer,
	edit: editTodoReducer,
	options: optionsReducer,
});
