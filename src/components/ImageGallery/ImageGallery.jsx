import ImageGalleryItem from 'components/ImageGalleryItem';

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
