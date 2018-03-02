import {
	GET_PHOTOS_REQUEST,
	GET_PHOTOS_SUCCESS
} from '../constants/Page';

const VK = window.VK;
if (!VK)
	throw new Error('ошибка загрузки вк апи');


export function getPhotos(year) {
	return dispatch => {
		dispatch({
			type: GET_PHOTOS_REQUEST,
			payload: year
		});

		setTimeout(() => {
			dispatch({
				type: GET_PHOTOS_SUCCESS,
				payload: [1, 2, 3, 4, 5]
			});
		}, 1000);
	}
}
