import {
	GET_PHOTOS_REQUEST,
	GET_PHOTOS_SUCCESS
} from '../constants/Page';
import { getMorePhotos, makeYearPhotos } from '../helpers';


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
