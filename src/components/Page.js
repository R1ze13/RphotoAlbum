import React, { Component } from 'react';
import PropTypes from 'prop-types';



export default class Page extends Component {

	static propTypes = {
		year: PropTypes.number.isRequired,
		photos: PropTypes.array.isRequired,
		fetching: PropTypes.bool.isRequired,
		error: PropTypes.any.isRequired,
		getPhotos: PropTypes.func.isRequired
	}


	constructor(props) {
		super(props);

		this.yearBtnClickHandler = this.yearBtnClickHandler.bind(this);
		this.init();
	}


	init() {
		this.props.getPhotos(2018);
	}


	yearBtnClickHandler(ev) {
		this.props.getPhotos(+ev.target.innerText);
	}


	render() {
		const { year, photos, fetching, error } = this.props;

		return (
			<div className="ib page">
				<div>
					<button className="btn" onClick={ this.yearBtnClickHandler }>2016</button>{' '}
					<button className="btn" onClick={ this.yearBtnClickHandler }>2017</button>{' '}
					<button className="btn" onClick={ this.yearBtnClickHandler }>2018</button>
				</div>
				<h3>{year} год [{photos.length}]</h3>
				{ error ? <p className="error">{ error }</p> : '' }
				{ fetching ?
					'Загрузка...' :
					photos.map((photo, idx) =>
						photo.photo_1280 ?
						<div key={ idx } className="photo">
							<img src={ photo.photo_1280 } alt={ photo.text } />
							<p>{ photo.likes.count } ❤</p>
						</div> :
						''
					)
				}
			</div>
		);
	}

}
