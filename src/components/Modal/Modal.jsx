import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const OverlayDiv = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalImg = styled.img`
  height: auto;
  margin: auto;
  display: block;

  max-width: 500px;
`;

// const ModalText = styled.p`
//   margin: auto;
//   display: block;
//   width: 80%;
//   max-width: 700px;
//   text-align: center;
//   color: #ccc;
//   padding: 10px 0;
//   height: 150px;
// `;

const modalRoot = document.querySelector('#modal--root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal Component mounted');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal Component updated');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) this.props.onClose();
  };

  render() {
    return createPortal(
      <OverlayDiv onClick={this.handleBackDrop}>
        <ModalImg src={this.props.src} alt="img" />
      </OverlayDiv>,
      modalRoot
    );
  }
}
