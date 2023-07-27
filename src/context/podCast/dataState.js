/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import DataContext from './dataContext';
import DataReducer from './dataReducer';

const DataState = (props) => {
	const initialState = {
		track: {},
		author: {},
		detail: [],
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

	const getDetail = async (id) => {
		// console.log("id in data state", id);
		try {
			const URL = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

			const response = await fetch(URL);
			const data = await response.json();
			//console.log('data in getDetail', data.results);
			const deleteOne = () => {
				const wrapperType = 'track';
				const index = data.results.findIndex(
					(e) => e.wrapperType === wrapperType,
				);

				//function to remove index "0"
				if (index !== -1) {
					const newData = [...data.results];
					newData.splice(index, 1);
					return newData;
				}
			};
			const results = deleteOne(data);
			const filter = results.map((e) => {
				return {
					title: e.trackName,
					date: e.releaseDate.slice(0, 10),
					duration: e.trackTimeMillis / (1000 * 60),
					trackId: e.trackId,
					name: e.trackName,
					description: e.description,
					url: e.episodeUrl,
				};
			});

			console.log('data in state', data);

			dispatch({
				type: 'FIND_DETAIL',
				payload: filter,
			});
		} catch (error) {
			console.log({ 'Error in getDetail': error.message });
		}
	};

	const getAuthor = async (id) => {
		try {
			const findAuthor = state.allData.filter((e) => e.id === id);
			dispatch({
				type: 'FIND_AUTHOR',
				payload: findAuthor[0],
			});
		} catch (error) {
			console.log({ 'Error in getDetail': error.message });
		}
	};

	const getEpisode = async (trackId) => {
		try {
			// eslint-disable-next-line eqeqeq
			const findEpisode = state.detail.filter((e) => e.trackId == trackId);
			dispatch({
				type: 'FIND_EPISODE',
				payload: findEpisode[0],
			});
		} catch (error) {
			console.log({ 'Error in getEpisode': error.message });
		}
	};
	console.log('track in State', state.track);
	return (
		<DataContext.Provider
			value={{
				getData,
				getAuthor,
				getDetail,
				getEpisode,
				filterByName,
				track: state.track,
				author: state.author,
				detail: state.detail,
				allData: state.allData,
				filteredData: state.filteredData,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
};
export default DataState;
