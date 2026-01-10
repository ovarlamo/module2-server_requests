import { useRef, useState } from 'react';
import styles from './control-panel.module.css';
import { Debounce } from '../../../../utils';

import { useTodos } from '../../hooks/use-todos';

const ControlPanel = ({ runSearch }) => {
	const { isSort, setIsSort, addTodo } = useTodos();

	const [searchInput, setSearchInput] = useState('');

	const debounceOnSearch = useRef(Debounce(runSearch, 1000)).current;

	const onChangeSearchInput = ({ target }) => {
		setSearchInput(target.value);
		debounceOnSearch(target.value);
	};

	const onChangeIsSort = ({ target }) => {
		setIsSort(target.checked);
	};
	return (
		<div className={styles.controlPanel}>
			<input
				value={searchInput}
				onChange={onChangeSearchInput}
				type="text"
				placeholder="Search..."
				className={styles.searchInput}
			/>
			<input
				className={styles.sortCheckbox}
				type="checkbox"
				checked={isSort}
				onChange={onChangeIsSort}
			></input>
			<button className={styles.addButton} onClick={addTodo}>
				+
			</button>
		</div>
	);
};
export default ControlPanel;
