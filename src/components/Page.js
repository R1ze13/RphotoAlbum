import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';



export default class Page extends Component {

	static propTypes = {
		year: PropTypes.number.isRequired,
		photos: PropTypes.array.isRequired,
		fetching: PropTypes.bool.isRequired,
		error: PropTypes.any.isRequired,
		getPhotos: PropTypes.func.isRequired,
		openLightbox: PropTypes.func.isRequired,
		closeLightbox: PropTypes.func.isRequired,
		gotoSlide: PropTypes.func.isRequired
	}


	constructor(props) {
		super(props);

		this.years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
		this.yearBtnClickHandler = this.yearBtnClickHandler.bind(this);
		this.photoClickHandler = this.photoClickHandler.bind(this);
		this.prevPhotoClickHandler = this.prevPhotoClickHandler.bind(this);
		this.nextPhotoClickHandler = this.nextPhotoClickHandler.bind(this);
		this.sliderClickHandler = this.sliderClickHandler.bind(this);
		this.init();
	}


	init() {
		this.props.getPhotos(this.years[this.years.length - 1]);
	}


	yearBtnClickHandler(ev) {
		this.props.getPhotos(+ev.target.innerText);
	}


	photoClickHandler(ev) {
		const idx = +ev.currentTarget.dataset.index;
		this.props.openLightbox(idx);
	}


	sliderClickHandler() {
		if (this.props.currentImage === this.props.photos.length - 1) return;

		this.nextPhotoClickHandler();
	}


	prevPhotoClickHandler() {
		this.props.gotoSlide(this.props.currentImage - 1);
	}


	nextPhotoClickHandler() {
		this.props.gotoSlide(this.props.currentImage + 1);
	}


	render() {
		const {
			year,
			photos,
			fetching,
			error,
			isLightboxOpen,
			closeLightbox,
			currentImage
		} = this.props;

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
						<div
							key={ idx }
							data-index={ idx }
							className="photo"
							onClick={ this.photoClickHandler }
						>
							<img
								src={ photo.sizes[photo.sizes.length - 1].src }
								alt={ photo.text }
							/>
							<p>{ photo.likes.count } ❤</p>
						</div>
					)
				}
				<Lightbox
					images={photos}
					currentImage={currentImage}
					isOpen={isLightboxOpen}
					showThumbnails={true}
					onClose={closeLightbox}
					backdropClosesModal={true}
					onClickPrev={this.prevPhotoClickHandler}
					onClickNext={this.nextPhotoClickHandler}
					onClickImage={this.sliderClickHandler}
				/>
			</div>
		);
	}

}
