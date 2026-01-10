import styles from './app.module.css';
import { ControlPanel } from 'features/todos/components';
import { TodoList } from 'features/todos/components';
import { useTodos } from 'features/todos/hooks/use-todos';
import { useEffect } from 'react';
export const App = () => {
	const { todos, isSort, searchStr, loadTodos, setSearchStr } = useTodos();
	useEffect(() => {
		loadTodos(isSort, searchStr);
	}, [isSort, searchStr]);
	const runSearch = (str) => setSearchStr(str);

	return (
		<div className={styles.app}>
			<h3>Список дел</h3>
			<ControlPanel runSearch={runSearch} />
			<TodoList todos={todos} />
		</div>
	);
};
