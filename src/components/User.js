import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class User extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		handleLogin: PropTypes.func.isRequired,
		checkLoginStatus: PropTypes.func.isRequired,
		error: PropTypes.string.isRequired,
		fetching: PropTypes.bool.isRequired
	}


	componentWillMount() {
		this.props.checkLoginStatus();
	}


	render() {
		const { name, error, fetching } = this.props;
		let template;

		if (name) {
			template = <p>Привет, {name}</p>
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
