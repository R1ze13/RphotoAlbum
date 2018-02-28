import { SET_YEAR } from '../constants/Page';


const initialState = {
	year: 2018,
	photos: []
}

export default function page(state = initialState, action) {

	switch (action.type) {
		case SET_YEAR:
			return { ...state, year: action.payload }

		default:
			return state;
	}

}
