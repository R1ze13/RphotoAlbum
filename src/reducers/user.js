import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	CHECK_LOGIN_STATUS
} from '../constants/User';


const initialState = {
	name: '',
	error: '',
	fetching: false
}

export default function user(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
		case CHECK_LOGIN_STATUS:
			return { ...state, fetching: true }

		case LOGIN_SUCCESS:
			return { ...state, name: action.payload, error: '', fetching: false }

		case LOGIN_FAIL:
			return { ...state, error: action.payload.message, fetching: false }

		default:
			return state;
	}
}
