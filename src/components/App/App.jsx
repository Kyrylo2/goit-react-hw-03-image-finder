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
      try {
        this.setState({ spinner: true });

        const data = await this.getPictures();

        const { hits, totalHits } = data;

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
        }));

        if (currentPage === 1) {
          toast.success(`Wow! We found ${totalHits} pictures`);
          window.scroll(0, 0);
        }

        const totalPages = Math.ceil(totalHits / picturesPerPage);
        this.setState({ totalPages });

        if (totalPages > 1 || currentPage < totalPages)
          this.setState({ loadingMoreButtonVisibility: true });

        if (currentPage >= totalPages) {
          this.setState({ loadingMoreButtonVisibility: false });
          toast.info(
            `You have looked at all the countries in your query "${inputValue}". Please start your search from the beginning`
          );
        }
      } catch (e) {
        if (this.state.loadingMoreButtonVisibility === true)
          this.setState({ loadingMoreButtonVisibility: false });

        toast.info(e.message);
      }
    }
  }

  updateState = (inputValue = '') => {
    this.setState({
      inputValue: inputValue,
      pictures: [],
      currentPage: 1,
      loadingMoreButtonState: false,
      LoadingMoreButtonVisibility: false,
    });
  };

  handleFormSubmit = inputData => {
    if (inputData !== this.state.inputValue && inputData.trim() !== '') {
      this.updateState(inputData);
    } else {
      return toast.warn('New input must be different from existing!');
    }
  };

  getPictures = async () => {
    this.setState({ spinner: true });
    try {
      return await imageAPI(
        this.state.inputValue,
        this.state.currentPage,
        this.state.picturesPerPage
        // this.updateState
      );
    } catch (e) {
      // this.updateState();
      throw new Error(e.message);
    } finally {
      this.setState({ spinner: false });
    }
  };

  handleOnFetchPicturesData = pictures => {
    this.setState(prevState => ({
      pictures: [...prevState.pictures, ...pictures],
    }));
  };

  handleLoadingMoreButton = async () => {
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
    this.setState({ fullImage, imageTags });
    this.toggleModal();
  };

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
          />
        )}
        <ToastContainer theme="dark" newestOnTop />
      </AppContainer>
    );
    // }
  }
}
