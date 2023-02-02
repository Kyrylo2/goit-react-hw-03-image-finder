import { Component } from 'react';

import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled.js';

export default class ImageGalleryItem extends Component {
  state = {
    picturesArr: this.props.picturesArray,
  };

  handleImagePicked = (fullImage, imageTags) => {
    console.log(`Image clicked`, fullImage, imageTags);
    this.props.onImageClick(fullImage, imageTags);
  };

  render() {
    const picturesArr = this.props.picturesArray;
    return (
      <>
        {picturesArr.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItemLi key={id}>
              <ImageGalleryItemImage
                src={webformatURL}
                alt={tags}
                onClick={() => this.handleImagePicked(largeImageURL, tags)}
              />
            </ImageGalleryItemLi>
          );
        })}
      </>
    );
  }
}
