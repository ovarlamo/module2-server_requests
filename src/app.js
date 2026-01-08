import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Todo } from './components';
import { ControlPanel } from './components/control-panel/control-panel';

import { useDispatch, useSelector } from 'react-redux';

import { loadTodos } from './actions/load-todos';

export const App = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.todos);
	const isSort = useSelector((state) => state.options.isSort);
	const searchStr = useSelector((state) => state.options.searchStr);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const setTasks = () => {};

	useEffect(() => {
		const loadDatas = async () => {
			setIsLoading(true);
			setError(false);
			try {
				dispatch(loadTodos(isSort, searchStr));
			} catch (err) {
				setIsLoading(false);
				setError(err.message);
			} finally {
				console.log('useEffect->loadDatas');
				setIsLoading(false);
			}
		};
		loadDatas();
	}, [isSort, searchStr]);

	return (
		<div className={styles.app}>
			{isLoading && <p>Загрузка...</p>}
			{error && <p className={styles.error}>Ошибка: {error}</p>}

			<h3>Список дел</h3>
			<div>
				<ControlPanel></ControlPanel>
			</div>
			{!isLoading && !error && (
				<div className={styles['list-container']}>
					{tasks.map(({ id, name, finished, isEdit = false }, index) => (
						<Todo
							name={name}
							key={id}
							id={id}
							finished={finished}
							isEdit={isEdit}
						></Todo>
					))}
				</div>
			)}
		</div>
	);
};
