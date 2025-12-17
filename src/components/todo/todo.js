import styles from './todo.module.css';
import { useState } from 'react';
export const Todo = ({ name, isSelectedProp, onSelectionChange }) => {
	const [isSelected, setIsSelected] = useState(isSelectedProp || false);
	const handleChange = () => {
		const newSelectedState = !isSelected;
		setIsSelected(newSelectedState);
		if (onSelectionChange) {
			onSelectionChange(newSelectedState);
		}
	};
	return (
		<div className={styles['todo']}>
			<input
				type="checkbox"
				className={styles['checkbox']}
				checked={isSelected}
				onChange={handleChange}
			/>
			{name}
		</div>
	);
};
