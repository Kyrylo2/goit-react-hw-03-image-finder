import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../SearchBar';
import ImageGallery from '../ImageGallery';
import AppContainer from '../AppContainer';

// import styled from '@emotion/styled';
import { AppDiv } from '../AppContainer/App.styled';

export default class App extends Component {
  state = {
    inputValue: '',
    status: 'idle',
  };

  handleFormSubmit = inputData => {
    this.setState({ inputValue: inputData });
    this.handleChangeStatus('rendering');
  };

  handleChangeStatus = statusProp => {
    console.log('change status', statusProp);
    this.setState({ status: statusProp });
  };

  render() {
    const { status } = this.state;

    if (status === 'idle') {
      return (
        <AppDiv>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </AppDiv>
      );
    }

    if (status === 'rendering') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleFormSubmit} />

          <ImageGallery
            inputValue={this.state.inputValue}
            onImageClick={this.handleImageFull}
            handleChangeStatus={this.handleChangeStatus}
          />
          <ToastContainer />
        </AppContainer>
      );
    }
  }
}
