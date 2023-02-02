import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../SearchBar';
import ImageGallery from '../ImageGallery';
import AppContainer from '../AppContainer';
import LoadingMoreButton from '../LoadingMoreButton';
import imageAPI from '../Services';
import Spinner from '../Spinner';
import Modal from '../Modal';

export default class App extends Component {
  state = {
    inputValue: '',
    pictures: [],
    currentPage: 1,
    spinner: false,
    totalPages: 0,
    picturesPerPage: 12,
    loadingMoreButtonState: false,
    loadingMoreButtonVisibility: false,
    showModal: false,
    fullImage: null,
    altTags: null,
  };

  async componentDidUpdate(_, prevState) {
    const { inputValue, currentPage, picturesPerPage } = this.state;

    if (
      prevState.inputValue !== inputValue ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ spinner: true });

      const data = await this.getPictures();
      console.log(data);

      const { hits, totalHits } = data;

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits],
      }));

      if (currentPage === 1) {
        toast.success(`Hooray! We found ${totalHits} images`);
        window.scroll(0, 0);
      }

      const totalPages = Math.ceil(totalHits / picturesPerPage);
      this.setState({ totalPages });
      console.log(`Total pages: ${totalPages}`);

      if (totalPages > 1 || currentPage < totalPages)
        this.setState({ loadingMoreButtonVisibility: true });

      if (currentPage >= totalPages) {
        this.setState({ loadingMoreButtonVisibility: false });
        toast.info(
          `You have looked at all the countries in your query "${inputValue}". Please start your search from the beginning`
        );
      }
    }
  }

  handleFormSubmit = inputData => {
    console.log('Submit input data', inputData);
    if (inputData !== this.state.inputValue || inputData.trim() !== '') {
      this.setState({
        inputValue: inputData,
        pictures: [],
        currentPage: 1,
        loadingMoreButtonState: false,
        LoadingMoreButtonVisibility: false,
      });
      console.log('inputValue changed and set to state');
    }
  };

  getPictures = async () => {
    this.setState({ spinner: true });
    try {
      return await imageAPI(
        this.state.inputValue,
        this.state.currentPage,
        this.state.picturesPerPage
      );
    } catch (e) {
      toast.error(e.message);
    } finally {
      this.setState({ spinner: false });
    }
  };

  handleOnFetchPicturesData = pictures => {
    console.log('Update picture data in state');
    this.setState(prevState => ({
      pictures: [...prevState.pictures, ...pictures],
    }));
  };

  // handleChangeStatus = statusProp => {
  //   console.log('change status', statusProp);
  //   this.setState({ status: statusProp });
  // };

  handleLoadingMoreButton = async () => {
    console.log('Loading More...');
    this.setState({ LoadingMoreButton: true });
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
    await this.getPictures();
    this.setState({ LoadingMoreButton: false });
  };

  loadingMoreButtonHide = () => {
    this.setState({ LoadingMoreButton: false });
  };

  //------ modal methods --------------------------------
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImagePicked = (fullImage, imageTags) => {
    console.log(`Image data in state`);
    this.setState({ fullImage, imageTags });
    this.toggleModal();
  };

  // resetImagePicker = () => {
  //   console.log(`Image data reset`);
  //   this.setState({ fullImage: null, imageTags: null });
  // };

  render() {
    const {
      spinner,
      pictures,
      loadingMoreButtonVisibility,
      loadingMoreButtonState,
      fullImage,
      altTags,
      showModal,
    } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          pictures={pictures}
          onImageClick={this.handleImagePicked}
        />

        {spinner && <Spinner isActive={spinner} />}

        {loadingMoreButtonVisibility && (
          <LoadingMoreButton
            onClick={this.handleLoadingMoreButton}
            buttonState={loadingMoreButtonState}
          />
        )}

        {showModal && (
          <Modal
            activeImage={fullImage}
            activeTags={altTags}
            onClose={this.toggleModal}
            resetImagePicker={this.resetImagePicker}
          />
        )}
        <ToastContainer />
      </AppContainer>
    );
    // }
  }
}
