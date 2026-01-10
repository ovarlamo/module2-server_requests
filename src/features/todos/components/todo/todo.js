import styles from './todo.module.css';
import { NEW_TODO_ID } from '../../../../constants';
import { useState } from 'react';

const Todo = ({ todo, toggleTodoFinished, saveTodo, removeTodo }) => {
	const { id, name, finished } = todo;
	const [editName, setEditName] = useState(name);
	const isNew = id === NEW_TODO_ID;
	const [isEditMode, setIsEditMode] = useState(isNew);

	const onClickSaveButton = () => {
		saveTodo(id, { id, name: editName, finished });
		setIsEditMode(false);
	};
	const onClickDeleteButton = () => removeTodo(id);

	const onChangeTodoFinished = ({ target }) => {
		toggleTodoFinished(id, name, target.checked);
	};

	return (
		<div className={styles['todo']}>
			<input
				type="checkbox"
				className={styles['checkbox']}
				checked={finished}
				onChange={onChangeTodoFinished}
				disabled={isNew}
			/>
			<div className={styles.todoName}>
				{isEditMode ? (
					<input
						type="text"
						className={styles.inputText}
						placeholder="Enter task name"
						value={editName}
						onChange={({ target }) => {
							setEditName(target.value);
						}}
					/>
				) : (
					<span onClick={() => setIsEditMode(true)}>{name}</span>
				)}
			</div>
			<div className={styles.blockButtons}>
				{isEditMode ? (
					<button className={styles.button} onClick={onClickSaveButton}>
						✎
					</button>
				) : (
					<button className={styles.button} onClick={onClickDeleteButton}>
						✖
					</button>
				)}
			</div>
		</div>
	);
};
export default Todo;
