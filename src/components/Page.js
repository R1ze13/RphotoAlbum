import React, { Component } from 'react';
import PropTypes from 'prop-types';



export default class Page extends Component {

	static propTypes = {
		year: PropTypes.number.isRequired,
		photos: PropTypes.array.isRequired,
		fetching: PropTypes.bool.isRequired,
		getPhotos: PropTypes.func.isRequired
	}


	constructor() {
		super();

		this.yearBtnClickHandler = this.yearBtnClickHandler.bind(this);
	}


	yearBtnClickHandler(ev) {
		this.props.getPhotos(+ev.target.innerText);
	}


	render() {
		const { year, photos, fetching } = this.props;

		return (
			<div className="ib page">
				<div>
					<button className="btn" onClick={ this.yearBtnClickHandler }>2016</button>{' '}
					<button className="btn" onClick={ this.yearBtnClickHandler }>2017</button>{' '}
					<button className="btn" onClick={ this.yearBtnClickHandler }>2018</button>
				</div>
				<h3>{ year } год</h3>
				{ fetching ?
					'Загрузка...' :
					<p>У тебя { photos.length } фото за { year } год!</p>
				}
			</div>
		);
	}

}
