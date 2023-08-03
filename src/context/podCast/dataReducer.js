import {
	FIND_AUTHOR,
	FIND_DATA,
	FIND_DETAIL,
	FIND_EPISODE,
	GET_DATA,
	SET_LOADER,
} from '../types';

const DataReducer = (state, action) => {
	const { payload, type } = action;
	switch (type) {
		case GET_DATA:
			return {
				...state,
				allData: payload,
				filteredData: payload,
			};
		case FIND_DATA:
			return {
				...state,
				filteredData: payload,
			};
		case FIND_DETAIL:
			return {
				...state,
				detail: payload,
			};
		case FIND_AUTHOR:
			return {
				...state,
				author: payload,
			};
		case FIND_EPISODE:
			return {
				...state,
				track: payload,
			};
		case SET_LOADER:
			return {
				...state,
				loader: payload,
			};
		default: {
			return {
				...state,
			};
		}
	}
};

export default DataReducer;
