import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { OverlayDiv, ModalImg } from './Modal.styled.js';

const modalRoot = document.querySelector('#modal--root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <OverlayDiv onClick={this.handleBackDrop}>
        <ModalImg src={this.props.activeImage} alt={this.props.activeTags} />
      </OverlayDiv>,
      modalRoot
    );
  }
}
