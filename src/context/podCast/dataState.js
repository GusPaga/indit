/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import DataContext from './dataContext';
import DataReducer from './dataReducer';

const DataState = (props) => {
	const initialState = {
		allData: [],
		filteredData: [],
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

	const FindNeedle = (haystack, needle) => {
		for (let i = 0; i < haystack.length; i++) {
			if (haystack.slice(i, needle.length + i) === needle) return i;
		}
		return -1;
	};

	const filterByName = (name) => {
		// console.log("input in filterByName", name);
		// console.log("data in filterByName", allData);

		try {
			if (!name || name === ' ') {
				return state.allData;
			}
			// eslint-disable-next-line array-callback-return
			const search = state.allData.filter((e) => {
				if (
					FindNeedle(e.author.toLocaleLowerCase(), name.toLocaleLowerCase()) >
					-1
				) {
					return e;
				}
				if (
					FindNeedle(e.name.toLocaleLowerCase(), name.toLocaleLowerCase()) > -1
				) {
					return e;
				}
				if (
					FindNeedle(e.title.toLocaleLowerCase(), name.toLocaleLowerCase()) > -1
				) {
					return e;
				}
			});
			//   console.log("filter", search);
			dispatch({
				type: 'FIND_DATA',
				payload: search,
			});
		} catch (error) {
			console.log('Fail filterByName', error.message);
		}
	};

	return (
		<DataContext.Provider
			value={{
				allData: state.allData,
				filteredData: state.filteredData,
				getData,
				filterByName,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
};
export default DataState;
