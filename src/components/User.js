import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class User extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		handleLogin: PropTypes.func.isRequired,
		handleLogout: PropTypes.func.isRequired,
		checkLoginStatus: PropTypes.func.isRequired,
		error: PropTypes.string.isRequired,
		fetching: PropTypes.bool.isRequired
	}


	constructor(props) {
		super(props);

		this.props.checkLoginStatus();
	}


	render() {
		const { name, error, fetching } = this.props;
		let template;

		if (name) {
			template =
				<div>
					<p>Привет, {name}</p>
					<button className="btn" type="button" onClick={ this.props.handleLogout }>Выйти</button>
				</div>
		} else {
			template = <button className="btn" onClick={ this.props.handleLogin }>Войти</button>
		}

		return (
			<div className="ib user">
				{ fetching ?
					'Загрузка...' :
					template
				}
				{ error ? <p>Не получилось :(<br /> Попробуйте еще раз</p> : '' }
			</div>
		);
	}

}
