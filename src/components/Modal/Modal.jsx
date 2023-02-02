import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const OverlayDiv = styled.div`
  overflow-y: scroll;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
  transition: opacity 250ms var(--timing-function),
    visibility 250ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1200;
`;

const ModalImg = styled.img`
  width: 100%;
  max-width: 700px;
  height: auto;
  margin: auto;
  display: block;
  z-index: 1300;
`;

const modalRoot = document.querySelector('#modal--root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal Component mounted');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal Component unmounted');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
      this.props.resetImagePicker();
    }
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
      this.props.resetImagePicker();
    }
  };

  render() {
    console.log('rendering');
    return createPortal(
      <OverlayDiv
        onClick={e => {
          this.handleBackDrop(e);
          // this.props.resetImagePicker();
        }}
      >
        <ModalImg src={this.props.activeImage} alt={this.props.activeTags} />
      </OverlayDiv>,
      modalRoot
    );
  }
}
