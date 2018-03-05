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

		this.years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
		this.yearBtnClickHandler = this.yearBtnClickHandler.bind(this);
		this.init();
	}


	init() {
		this.props.getPhotos(this.years[this.years.length - 1]);
	}


	yearBtnClickHandler(ev) {
		this.props.getPhotos(+ev.target.innerText);
	}


	render() {
		const { year, photos, fetching, error } = this.props;

		return (
			<div className="ib page">
				<div>
					{
						this.years.map((year, idx) => <button className="btn" key={ idx } onClick={ this.yearBtnClickHandler }>{ year }</button>)
					}
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
