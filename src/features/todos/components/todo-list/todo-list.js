import { Todo } from 'features/todos/components';
import { useTodos } from 'features/todos/hooks/use-todos';
import { useEffect } from 'react';
const TodoList = ({ todos }) => {
	const { toggleTodoFinished, saveTodo, removeTodo } = useTodos();

	return (
		<ul>
			{todos.map((todo) => (
				<Todo
					saveTodo={saveTodo}
					toggleTodoFinished={toggleTodoFinished}
					todo={todo}
					key={todo.id}
					removeTodo={removeTodo}
				/>
			))}
		</ul>
	);
};
export default TodoList;
