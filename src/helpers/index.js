import {
	GET_PHOTOS_SUCCESS,
	GET_PHOTOS_FAIL
} from '../constants/Page';
import { photosObj } from '../actions/PageActions';

const VK = window.VK;
if (!VK)
	throw new Error('ошибка загрузки вк апи');


export function makeYearPhotos(photos, selectedYear) {
	let createdYear;
	let yearPhotos = [];

	photos.forEach(photo => {
		createdYear = new Date(photo.date * 1000).getFullYear();
		if (createdYear === selectedYear)
			yearPhotos.push(photo);
	});

	yearPhotos.sort((a, b) => b.likes.count - a.likes.count);

	return yearPhotos;
}


export function getMorePhotos(offset, count, year, dispatch) {
	let user_ids;
	VK.Auth.getLoginStatus(r => {
		if (r.session) {
			user_ids = r.session.mid;
		} else {
			dispatch({
				type: GET_PHOTOS_FAIL,
				error: true,
				payload: new Error('Необходимо авторизоваться')
			});
		}
	});

	if (!user_ids) return;

	VK.Api.call('photos.getAll', {
		extended: true, v: 5.73, photo_sizes: true, user_ids, count, offset
	}, r => {
		try {
			if (offset <= r.response.count - count) {
				offset += 200;
				photosObj.photosArr = photosObj.photosArr.concat(r.response.items);
				photosObj.photosArr.map(photo => photo.src = photo.sizes[photo.sizes.length - 1].src);
				getMorePhotos(offset, count, year, dispatch);
			} else {
				let photos = makeYearPhotos(photosObj.photosArr, year);
				photosObj.cached = true;
				dispatch({
					type: GET_PHOTOS_SUCCESS,
					payload: photos
				});
			}
		} catch(e) {
			const error = r.error.error_msg || e;
			console.error(error);
			dispatch({
				type: GET_PHOTOS_FAIL,
				error: true,
				payload: new Error(error)
			});
		}
	});
}
