import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled.js';

const ImageGallery = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onImageClick,
}) => {
  // state = {
  //   pictures: [],
  // };

  // componentDidUpdate(prevProps, _) {
  //   console.log('prevState.pictures', prevProps.pictures);
  //   console.log('this.props.pictures', this.props.pictures);

  //   // this.setState({ pictures: this.props.pictures });
  // }

  // handleImagePicked = (fullImage, imageTags) => {
  //   console.log(`Image clicked`, fullImage, imageTags);
  //   this.props.onImageClick(fullImage, imageTags);
  // };

  return (
    <ImageGalleryItemLi key={id}>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => {
          console.log('Image clicked');
          return onImageClick(largeImageURL, tags);
        }}
        loading="lazy"
      />
    </ImageGalleryItemLi>
  );
};

export default ImageGallery;
