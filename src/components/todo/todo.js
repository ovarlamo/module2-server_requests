import styles from './todo.module.css';
import { NEW_TODO_ID } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAction } from '../../actions/delete-todo';
import { saveTodoAction } from '../../actions/save-todo';
export const Todo = ({ id, name, finished }) => {
	const dispatch = useDispatch();
	const editName = useSelector((state) => state.editTodo.name);

	const isNew = id === NEW_TODO_ID;
	const isEditMode = useSelector(
		(state) => state.editTodo.id === id && state.editTodo.isEdit,
	);

	const onChangeName = ({ target }) => {
		dispatch({
			type: 'SET_EDIT_TODO',
			payload: { id, name: target.value, finished, isEdit: true },
		});
	};
	const onClickSaveButton = () => dispatch(saveTodoAction(id, editName, finished));
	const onClickDeleteButton = () => dispatch(deleteTodoAction(id));

	const onChangeCheckbox = () => {
		dispatch(saveTodoAction(id, editName, !finished));
	};
	const onClickTodoName = () => {
		if (!isNew) {
			dispatch({
				type: 'SET_EDIT_TODO',
				payload: { id, name, finished, isEdit: true },
			});
		}
	};

	return (
		<div className={styles['todo']}>
			<input
				type="checkbox"
				className={styles['checkbox']}
				checked={finished}
				onChange={onChangeCheckbox}
				disabled={isNew}
			/>
			<div className={styles.todoName}>
				{isEditMode ? (
					<input
						type="text"
						className={styles.inputText}
						placeholder="Enter task name"
						value={editName}
						onChange={onChangeName}
					/>
				) : (
					<span onClick={onClickTodoName}>{name}</span>
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
