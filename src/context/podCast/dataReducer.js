import { FIND_DATA, GET_DATA } from '../types';

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
		default: {
			return {
				...state,
			};
		}
	}
};

export default DataReducer;
