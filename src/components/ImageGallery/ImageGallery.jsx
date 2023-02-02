import { Component } from 'react';

import { toast } from 'react-toastify';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from '../Modal';

import LoadingMoreButton from '../LoadingMoreButton';
import imageAPI from '../Services';
import Spinner from 'components/Spinner/Spinner.jsx';

import { ImageGalleryUl } from './ImageGallery.styled.js';

export default class ImageGallery extends Component {
  state = {
    currentPage: 1,
    perPage: 12,
    pictures: [],
    spinner: false,
    showModal: false,
    fullImage: null,
    imageTags: null,
    err: null,
    LoadingMoreButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps.inputValue', prevProps.inputValue);
    console.log('this.props.inputValue', this.props.inputValue);

    if (prevProps.inputValue !== this.props.inputValue) {
      console.log('Input value changed');
      this.setState({ spinner: true });
      // this.setState({ spinner: true, currentPage: 1, pictures: [] });

      this.lodaImages();

      this.state.err && toast.warn(this.state.err);
    }

    if (prevState.currentPage !== this.state.currentPage) {
      console.log('Current page is changed');
      this.lodaImages(true);
      this.setState({ spinner: true });
    }
  }

  lodaImages = async (LoadingMoreButton = null) => {
    try {
      const response = await imageAPI(
        this.props.inputValue,
        this.state.currentPage
      );

      const pictures = response.data.hits;
      console.log('pictures: ', pictures);

      if (response.data.totalHits === 0)
        return toast.warn(
          `Could not find any images for the keyword ${this.props.inputValue}`
        );

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures],
      }));
    } catch (err) {
      this.setState({ err });
      toast.warn(err);
    } finally {
      this.setState({ spinner: false });
    }

    if (LoadingMoreButton) this.setState({ LoadingMoreButton: false });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImagePicked = (fullImage, imageTags) => {
    this.setState({ fullImage, imageTags });
  };

  resetImagePicker = () => {
    this.setState({ fullImage: null, imageTags: null });
  };

  handleLoadingMoreButton = () => {
    console.log('Loading More...');
    this.setState({ LoadingMoreButton: true });
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { spinner, pictures, fullImage, imageTags } = this.state;

    return (
      <>
        <Spinner isActive={spinner} />
        <ImageGalleryUl>
          {pictures && (
            <ImageGalleryItem
              picturesArray={pictures}
              onImageClick={this.handleImagePicked}
            />
          )}
          {fullImage && (
            <Modal
              activeImage={fullImage}
              activeTags={imageTags}
              onClose={this.toggleModal}
              resetImagePicker={this.resetImagePicker}
            />
          )}
        </ImageGalleryUl>
        {pictures && (
          <LoadingMoreButton
            onClick={this.handleLoadingMoreButton}
            buttonState={this.state.LoadingMoreButton}
          />
        )}
      </>
    );
  }
}
