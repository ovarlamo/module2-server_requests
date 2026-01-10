export const selectTodosState = (state) => state.todos;
export const selectTodos = (state) => selectTodosState(state).list.items;
export const selectEditTodo = (state) => selectTodosState(state).editTodo;
export const selectSearch = (state) => selectTodosState(state).options.searchStr;
export const selectIsSort = (state) => selectTodosState(state).options.isSort;
