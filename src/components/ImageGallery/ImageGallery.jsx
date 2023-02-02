// import { Component } from 'react';
// import { toast } from 'react-toastify';

import ImageGalleryItem from 'components/ImageGalleryItem';
// import Spinner from 'components/Spinner/Spinner.jsx';
// import Modal from '../Modal';
// // import imageAPI from '../Services';

import { ImageGalleryUl } from './ImageGallery.styled.js';

const ImageGallery = ({ pictures, onImageClick }) => {
  return (
    <ImageGalleryUl>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onImageClick={onImageClick}
          />
        );
      })}
    </ImageGalleryUl>
  );
};

export default ImageGallery;
