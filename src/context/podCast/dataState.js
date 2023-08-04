/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import DataContext from './dataContext';
import DataReducer from './dataReducer';
import { FindNeedle } from '../../helpers/findNeedle';

const DataState = (props) => {
	const initialState = {
		track: {},
		author: {},
		detail: [],
		allData: [],
		filteredData: [],
		loader: false,
	};
	const [state, dispatch] = useReducer(DataReducer, initialState);

	//This function requests the information from the server and renders it.
	const getData = async () => {
		try {
			dispatch({
				type: 'SET_LOADER',
				payload: true,
			});
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
			dispatch({
				type: 'SET_LOADER',
				payload: false,
			});
		} catch (error) {
			console.log({ 'error in getData': error.message });
		}
	};

	//This function receive one or more characters from searchBar and then find it in state.allData. Finally stores it in filteredData
	const filterByName = (name) => {
		try {
			dispatch({
				type: 'SET_LOADER',
				payload: true,
			});
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
			dispatch({
				type: 'FIND_DATA',
				payload: search,
			});
			dispatch({
				type: 'SET_LOADER',
				payload: false,
			});
		} catch (error) {
			console.log('Fail filterByName', error.message);
		}
	};

	//This function get all podcast of selected author.
	const getDetail = async (id) => {
		try {
			dispatch({
				type: 'SET_LOADER',
				payload: true,
			});
			const URL = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

			const response = await fetch(URL);
			const data = await response.json();

			//This function delete the first element of "const data" because that element does not contain information.
			const deleteOne = () => {
				const wrapperType = 'track';
				const index = data.results.findIndex(
					(e) => e.wrapperType === wrapperType,
				);

				if (index !== -1) {
					const newData = [...data.results];
					newData.splice(index, 1);
					return newData;
				}
			};
			const results = deleteOne(data);
			const filter = results.map((e) => {
				return {
					title: e.trackName ? e.trackName : 'unavailable',
					date: e.releaseDate ? e.releaseDate.slice(0, 10) : 'unavailable',
					duration: e.trackTimeMillis ? e.trackTimeMillis : 'unavailable',
					trackId: e.trackId ? e.trackId : 'unavailable',
					name: e.trackName ? e.trackName : 'unavailable',
					description: e.description ? e.description : 'unavailable',
					url: e.episodeUrl ? e.episodeUrl : 'unavailable',
				};
			});
			dispatch({
				type: 'FIND_DETAIL',
				payload: filter,
			});
			dispatch({
				type: 'SET_LOADER',
				payload: false,
			});
		} catch (error) {
			console.log({ 'Error in getDetail': error.message });
		}
	};

	//This function get all data of the selected author, to render in detail and podCast.
	const getAuthor = async (id) => {
		try {
			dispatch({
				type: 'SET_LOADER',
				payload: true,
			});
			const findAuthor = state.allData.filter((e) => e.id === id);
			dispatch({
				type: 'FIND_AUTHOR',
				payload: findAuthor[0],
			});
			dispatch({
				type: 'SET_LOADER',
				payload: false,
			});
		} catch (error) {
			console.log({ 'Error in getDetail': error.message });
		}
	};

	//This function get the information of selected podCast.
	const getEpisode = async (trackId) => {
		try {
			dispatch({
				type: 'SET_LOADER',
				payload: true,
			});
			// eslint-disable-next-line eqeqeq
			const findEpisode = state.detail.filter((e) => e.trackId == trackId);
			dispatch({
				type: 'FIND_EPISODE',
				payload: findEpisode[0],
			});
			dispatch({
				type: 'SET_LOADER',
				payload: false,
			});
		} catch (error) {
			console.log({ 'Error in getEpisode': error.message });
		}
	};

	//This function handles the state loader to render or not in the navBar.
	const setLoader = async (data) => {
		try {
			dispatch({
				type: 'SET_LOADER',
				payload: data,
			});
		} catch (error) {
			console.log({ 'Error in setLoader': error.message });
		}
	};

	return (
		<DataContext.Provider
			value={{
				getData,
				setLoader,
				getAuthor,
				getDetail,
				getEpisode,
				filterByName,
				track: state.track,
				author: state.author,
				detail: state.detail,
				allData: state.allData,
				loader: state.loader,
				filteredData: state.filteredData,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
};
export default DataState;
