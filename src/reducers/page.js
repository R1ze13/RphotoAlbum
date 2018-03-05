import {
	GET_PHOTOS_REQUEST,
	GET_PHOTOS_SUCCESS,
	GET_PHOTOS_FAIL,
	OPEN_LIGHTBOX,
	CLOSE_LIGHTBOX,
	GOTO_SLIDE
} from '../constants/Page';


const initialState = {
	year: 2018,
	photos: [],
	fetching: false,
	error: '',
	isLightboxOpen: false,
	currentImage: 0
}

export default function page(state = initialState, action) {

	switch (action.type) {
		case GET_PHOTOS_REQUEST:
			return { ...state, year: action.payload, fetching: true, error: '' }

		case GET_PHOTOS_SUCCESS:
			return { ...state, photos: action.payload, fetching: false, error: '' }

		case GET_PHOTOS_FAIL:
			return { ...state, error: action.payload.message, fetching: false }

		case OPEN_LIGHTBOX:
			return { ...state, isLightboxOpen: true, currentImage: action.currentImage }

		case GOTO_SLIDE:
				return { ...state, currentImage: action.currentImage }

		case CLOSE_LIGHTBOX:
			return { ...state, isLightboxOpen: false, currentImage: action.currentImage }

		default:
			return state;
	}

}
