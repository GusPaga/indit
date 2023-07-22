import { GET_DATA } from '../types';

const DataReducer = (state, action) => {
	const { payload, type } = action;
	switch (type) {
		case GET_DATA:
			return {
				...state,
				allData: payload,
			};
		default: {
			return {
				...state,
			};
		}
	}
};

export default DataReducer;
