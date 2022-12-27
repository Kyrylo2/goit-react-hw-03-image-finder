import { Component } from 'react';
import Modal from './Modal';

// import styled from '@emotion/styled';

class App extends Component {
  state = {
    showModal: false,
    modalImg: 'https://kor.ill.in.ua/m/610x385/2722809.jpg',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>

        {showModal && (
          <Modal src={this.state.modalImg} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
