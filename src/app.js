import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Todo } from './components';
import { ControlPanel } from './components/control-panel/control-panel';
import { getTodos, updateTodo, createTodo, deleteTodo } from './api/api';
import { SetTodoInTodos, AddTodoInTodos } from './utils';
import { NEW_TODO_ID } from './constants';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [isSort, setIsSort] = useState(false);
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		getTodos().then((data) => setTasks(data));
	}, []);
	const addTodo = () => {
		const newTask = { id: NEW_TODO_ID, name: '', isEdit: true, finished: false };
		setTasks((prevTasks) => AddTodoInTodos(prevTasks, newTask));
	};
	const saveTodo = (id, name, finished) => {
		if (id === NEW_TODO_ID) {
			createTodo({ name, finished }).then(({ id }) => {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === NEW_TODO_ID
							? { ...task, id, isEdit: false, name }
							: task,
					),
				);
			});
		} else {
			updateTodo(id, { name, finished }).then(({ id }) => {
				setTasks(SetTodoInTodos(tasks, { id, name, finished, isEdit: false }));
			});
		}
	};
	const deleteTodoFromDotos = (id) => {
		deleteTodo(id);
		setTasks((prevTasks) => prevTasks.filter((elem) => elem.id !== id));
	};
	const setIsEdit = (id) => {
		setTasks(SetTodoInTodos(tasks, { id, isEdit: true }));
	};
	const sortedTasks = isSort
		? [...tasks].sort((a, b) => a.name.localeCompare(b.name))
		: tasks;
	const tasksToShow = sortedTasks;
	const tasksFiltered = tasksToShow.filter((task) =>
		task.name.toLowerCase().includes(searchInput.toLowerCase()),
	);

	return (
		<div className={styles.app}>
			<h3>Список дел</h3>
			<div>
				<ControlPanel
					isSort={isSort}
					setIsSort={() => setIsSort(!isSort)}
					addTodo={addTodo}
					searchInput={searchInput}
					setSearchInput={setSearchInput}
				></ControlPanel>
			</div>
			<div className={styles['list-container']}>
				{tasksFiltered.map(({ id, name, finished, isEdit = false }, index) => (
					<Todo
						name={name}
						key={id}
						id={id}
						finished={finished}
						saveTodo={saveTodo}
						isEdit={isEdit}
						deleteTodo={deleteTodoFromDotos}
						setIsEdit={() => setIsEdit(id)}
					></Todo>
				))}
			</div>
		</div>
	);
};
