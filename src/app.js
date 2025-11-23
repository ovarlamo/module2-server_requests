import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Todo } from './components';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [taskInput, setTaskInput] = useState('');
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
			.then((response) => response.json())
			.then((data) => {
				const taskTitles = data.map((item) => item.title);
				setTasks(taskTitles);
			})
			.catch((error) => {
				console.error('Error fetching tasks:', error);
			});
	}, []);
	const onClick = () => {
		if (taskInput.trim() === '') {
			return;
		}
	};

	return (
		<div className={styles.app}>
			<h3>Список дел</h3>
			<div className={styles['list-container']}>
				{tasks.map((task, index) => (
					<Todo title={task} key={index}></Todo>
				))}
			</div>
			<div>
				<textarea
					value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
					className={styles.textarea}
					placeholder="Введите новое дело здесь..."
				></textarea>
			</div>

			<button onClick={onClick} className={styles.button} type="button">
				Добавить дело
			</button>
		</div>
	);
};
