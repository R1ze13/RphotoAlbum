import {
	GET_PHOTOS_REQUEST,
	GET_PHOTOS_SUCCESS,
	OPEN_LIGHTBOX,
	CLOSE_LIGHTBOX,
	GOTO_SLIDE
} from '../constants/Page';
import {
	getMorePhotos,
	makeYearPhotos
} from '../helpers';


const VK = window.VK;
if (!VK)
	throw new Error('ошибка загрузки вк апи');

export let photosObj = {
	photosArr: [],
	cached: false
};


export function getPhotos(year) {
	return function(dispatch) {
		dispatch({
			type: GET_PHOTOS_REQUEST,
			payload: year
		});

		if (photosObj.cached) {
			let photos = makeYearPhotos(photosObj.photosArr, year);
			dispatch({
				type: GET_PHOTOS_SUCCESS,
				payload: photos
			});
		} else {
			getMorePhotos(0, 200, year, dispatch);
		}
	}
}


export function openLightbox(photoIdx) {
	return function(dispatch) {
		dispatch({
			type: OPEN_LIGHTBOX,
			currentImage: photoIdx
		});
	}
}


export function gotoSlide(photoIdx) {
	return function(dispatch) {
		dispatch({
			type: GOTO_SLIDE,
			currentImage: photoIdx
		});
	}
}


export function closeLightbox() {
	return function(dispatch) {
		dispatch({
			type: CLOSE_LIGHTBOX,
			currentImage: 0
		});
	}
}
