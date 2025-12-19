import { useState } from 'react';
import styles from './control-panel.module.css';
export const ControlPanel = ({
	addTodo,
	setIsSort,
	isSort,
	searchInput,
	setSearchInput,
}) => {
	const handleAddClick = () => {
		addTodo();
	};
	return (
		<div className={styles.controlPanel}>
			<input
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				type="text"
				placeholder="Search..."
				className={styles.searchInput}
			/>
			<input
				className={styles.sortCheckbox}
				type="checkbox"
				checked={isSort}
				onChange={setIsSort}
			></input>
			<button className={styles.addButton} onClick={handleAddClick}>
				+
			</button>
		</div>
	);
};
