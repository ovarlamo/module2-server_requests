import { useRef } from 'react';
import styles from './control-panel.module.css';
import { Debounce } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchStr } from '../../actions/set-search-str';
import { NEW_TODO_ID } from '../../constants';

export const ControlPanel = () => {
	const isSort = useSelector((state) => state.options.isSort);
	const searchInput = useSelector((state) => state.options.searchInput);
	const dispatch = useDispatch();
	const setIsSort = () => {
		dispatch({ type: 'SET_IS_SORT', payload: !isSort });
	};
	const setSearchInput = (value) => {
		dispatch({ type: 'SET_SEARCH_INPUT', payload: value });
	};
	const onSearch = (value) => {
		dispatch(setSearchStr(value));
	};

	const addNewTodo = () => {
		dispatch({ type: 'ADD_TODO' });
		dispatch({
			type: 'SET_EDIT_TODO',
			payload: { id: NEW_TODO_ID, name: '', finished: false, isEdit: true },
		});
	};

	const debounceOnSearch = useRef(Debounce(onSearch, 1000)).current;

	const onChangeSearchInput = ({ target }) => {
		setSearchInput(target.value);
		debounceOnSearch(target.value);
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
				onChange={setIsSort}
			></input>
			<button className={styles.addButton} onClick={addNewTodo}>
				+
			</button>
		</div>
	);
};
