import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from '../constants/User';

const VK = window.VK;
if (!VK)
	throw new Error('ошибка загрузки вк апи');


export function handleLogin() {
	return function(dispatch) {

		dispatch({
			type: LOGIN_REQUEST
		});

		VK.auth.login(r => {
			if (r.session) {
				let username = r.session.user.first_name;

				dispatch({
					type: LOGIN_SUCCESS,
					payload: username
				});
			} else {
				dispatch({
					type: LOGIN_FAIL,
					error: true,
					payload: new Error('Ошибка авторизации')
				});
			}
		}, 4);

	}
}
