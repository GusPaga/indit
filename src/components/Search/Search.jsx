import { useContext, useState } from 'react';
import DataContext from '../../context/podCast/dataContext';
import './Search.scss';

export const Search = () => {
	const { getData, filteredData, filterByName, allData } =
		useContext(DataContext);
	const [input, setInput] = useState();

	const handleInput = (e) => {
		e.preventDefault();
		if (e.target.value.length === 0) {
			getData();
		}
		setInput(e.target.value);
		filterByName(input, allData);
	};

	console.log('data in Search', filteredData);
	console.log('input in search', input);

	return (
		<div id='search' className='container'>
			<div className='row justify-content-end '>
				<div className='col-4 d-flex'>
					{filteredData && (
						<button
							className='search btn btn-primary'
							type='button'
							data-bs-toggle='tooltip'
							title='Number of item selected'
						>
							{filteredData.length}
						</button>
					)}

					<input
						type='text'
						className='search mx-2 p-2'
						data-bs-toggle='tooltip'
						title='Write a Name'
						value={input}
						placeholder='Filter PodCast...'
						onChange={(e) => handleInput(e)}
					/>
				</div>
			</div>
		</div>
	);
};
