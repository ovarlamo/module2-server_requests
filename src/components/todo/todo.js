import styles from './todo.module.css';
export const Todo = ({ title }) => {
	return (
		<div className={styles['todo']}>
			<input type="checkbox" className={styles['checkbox']} />
			{title}
		</div>
	);
};
