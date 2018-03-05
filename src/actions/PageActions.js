import {
	GET_PHOTOS_REQUEST,
	GET_PHOTOS_SUCCESS
} from '../constants/Page';
import { getMorePhotos, makeYearPhotos } from '../helpers';


const VK = window.VK;
if (!VK)
	throw new Error('ошибка загрузки вк апи');


let photosArr = [];
let cached = false;


export function getPhotos(year) {
	return dispatch => {
		dispatch({
			type: GET_PHOTOS_REQUEST,
			payload: year
		});

		if (cached) {
			let photos = makeYearPhotos(photosArr, year);
			dispatch({
				type: GET_PHOTOS_SUCCESS,
				payload: photos
			});
		} else {
			console.log(dispatch);
			getMorePhotos(photosArr, cached, 0, 200, year, dispatch);
		}


		// VK.Auth.getLoginStatus(r => {
		// 	if (r.session) {
		// 		VK.Api.call('photos.getAll', {
		// 			user_ids: r.session.mid,
		// 			count: 20,
		// 			extended: true,
		// 			v: 5.73
		// 		},
		// 		r => {
		// 			const photos = r.response.items;
		//
		// 			if (photos) {
		// 				dispatch({
		// 					type: GET_PHOTOS_SUCCESS,
		// 					error: '',
		// 					payload: photos
		// 				});
		// 			} else {
		// 				dispatch({
		// 					type: GET_PHOTOS_FAIL,
		// 					payload: new Error('Ошибка загрузки фотографий'),
		// 					error: true
		// 				});
		// 			}
		// 		});
		// 	} else {
		// 		dispatch({
		// 			type: GET_PHOTOS_FAIL,
		// 			payload: new Error('Ошибка загрузки фотографий'),
		// 			error: true
		// 		});
		// 	}
		// });
	}
}
