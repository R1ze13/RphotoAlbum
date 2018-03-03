import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CHECK_LOGIN_STATUS,
	CHECK_LOGIN_STATUS_FAIL,
	LOGOUT_SUCCESS
} from '../constants/User';

const VK = window.VK;
if (!VK)
	throw new Error('ошибка загрузки вк апи');


export function handleLogin() {
	return function(dispatch) {

		dispatch({
			type: LOGIN_REQUEST
		});

		VK.Auth.login(r => {
			if (r.session) {
				let name = r.session.user.first_name;

				dispatch({
					type: LOGIN_SUCCESS,
					payload: name
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


export function handleLogout() {
	return function(dispatch) {

		VK.Auth.logout(r => {
			dispatch({
				type: LOGOUT_SUCCESS
			})
		});

	}
}


export function checkLoginStatus() {
	return function (dispatch) {

		dispatch({
			type: CHECK_LOGIN_STATUS
		});

		VK.Auth.getLoginStatus(r => {
			if (r.session) {
				VK.Api.call('users.get', {
					user_ids: r.session.mid,
					v: 5.73
				},
				r => {
					let name = r.response[0].first_name;

					dispatch({
						type: LOGIN_SUCCESS,
						payload: name
					});
				});
			} else {
				dispatch({
					type: CHECK_LOGIN_STATUS_FAIL,
					payload: ''
				});
			}
		});

	}
}
