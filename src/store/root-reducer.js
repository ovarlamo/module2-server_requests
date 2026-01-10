import { combineReducers } from 'redux';
import { todosFeatureReducer } from '../features/todos/store';
export const rootReducer = combineReducers({
	todos: todosFeatureReducer,
});
