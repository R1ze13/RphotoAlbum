import {
	GET_PHOTOS_REQUEST,
	GET_PHOTOS_SUCCESS,
	GET_PHOTOS_FAIL
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


		VK.Auth.getLoginStatus(r => {
			if (r.session) {
				VK.Api.call('photos.getAll', {
					user_ids: r.session.mid,
					count: 20,
					extended: true,
					v: 5.73
				},
				r => {
					const photos = r.response.items;

					if (photos) {
						dispatch({
							type: GET_PHOTOS_SUCCESS,
							payload: photos
						});
					} else {
						dispatch({
							type: GET_PHOTOS_FAIL,
							payload: new Error('Ошибка загрузки фотографий'),
							error: true
						});
					}
				});
			} else {
				dispatch({
					type: GET_PHOTOS_FAIL,
					payload: new Error('Ошибка загрузки фотографий'),
					error: true
				});
			}
		});
	}
}
