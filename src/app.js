import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Todo } from './components';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [selectedTasks, setSelectedTasks] = useState([]);
	const [taskInput, setTaskInput] = useState('');
	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((data) => {
				const loadedTasks = data.map((item) => item);
				setTasks(loadedTasks);
			})
			.catch((error) => {
				console.error('Error fetching tasks:', error);
			});
	}, []);
	const onClickAddTask = () => {
		if (taskInput.trim() === '') {
			return;
		}
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: taskInput.trim() }),
		})
			.then((response) => response.json())
			.then((newTask) => {
				setTasks((prevTasks) => [...prevTasks, newTask]);
				setTaskInput('');
			})
			.catch((error) => {
				console.error('Error adding task:', error);
			});
	};
	const onClickDeleteTask = () => {
		if (selectedTasks.length === 0) {
			return;
		}
		const idsToDelete = [...selectedTasks];
		if (idsToDelete.length === 0) return;

		// Delete all selected tasks on the server, then update local state
		Promise.all(
			idsToDelete.map((id) =>
				fetch(`http://localhost:3005/todos/${id}`, { method: 'DELETE' }),
			),
		)
			.then(() => {
				setTasks((prev) => prev.filter((t) => !idsToDelete.includes(t.id)));
				setSelectedTasks([]);
			})
			.catch((error) => {
				console.error('Error deleting tasks:', error);
			});
	};
	const onTaskSelectionChange = (taskId, isSelected) => {
		setSelectedTasks((prevSelectedTasks) => {
			if (isSelected) {
				return [...prevSelectedTasks, taskId];
			} else {
				return prevSelectedTasks.filter((id) => id !== taskId);
			}
		});
	};

	return (
		<div className={styles.app}>
			<h3>Список дел</h3>
			<div className={styles['list-container']}>
				{tasks.map(({ id, name }, index) => (
					<Todo
						name={name}
						key={id}
						onSelectionChange={(isSelected) =>
							onTaskSelectionChange(id, isSelected)
						}
						isSelected={selectedTasks.includes(id)}
					></Todo>
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

			<button onClick={onClickAddTask} className={styles.button} type="button">
				Добавить дело
			</button>
			<button onClick={onClickDeleteTask} className={styles.button} type="button">
				Удалить дело
			</button>
		</div>
	);
};
