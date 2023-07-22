/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import DataContext from './dataContext';
import DataReducer from './dataReducer';

const DataState = (props) => {
	const initialState = {
		allData: [],
	};
	const [state, dispatch] = useReducer(DataReducer, initialState);

	const getData = async () => {
		try {
			const URL =
				'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

			const response = await fetch(URL);
			const data = await response.json();
			const podCast = data.feed.entry;
			const podCastFiltered = podCast.map((e) => {
				return {
					id: e.id.label.slice(e.id.label.length - 15, e.id.label.length - 5),
					author: e['im:artist'].label,
					name: e['im:name'].label,
					title: e.title.label,
					imageS: e['im:image'][0].label,
					imageL: e['im:image'][2].label,
					summary: e.summary.label,
					releaseDate: e['im:releaseDate'].label,
				};
			});
			dispatch({
				type: 'GET_DATA',
				payload: podCastFiltered,
			});
		} catch (error) {
			console.log({ 'error in getData': error.message });
		}
	};
	return (
		<DataContext.Provider value={{ allData: state.allData, getData }}>
			{props.children}
		</DataContext.Provider>
	);
};
export default DataState;
