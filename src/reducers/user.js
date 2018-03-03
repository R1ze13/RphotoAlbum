import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	CHECK_LOGIN_STATUS,
	CHECK_LOGIN_STATUS_FAIL,
	LOGOUT_SUCCESS
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

		case CHECK_LOGIN_STATUS_FAIL:
			return { ...state, fetching: false }

		case LOGOUT_SUCCESS:
			return { ...state, name: action.payload, fetching: false }

		default:
			return state;
	}
}
