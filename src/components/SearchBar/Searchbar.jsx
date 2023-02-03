import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

import searchIcon from '../../resources/search_icon.svg';

export default class Searchbar extends Component {
  state = {
    input: '',
  };

  handleStateChange = e => {
    this.setState({ input: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.input.trim() === '') {
      return toast.warn('Please enter a valid input');
    }
    // this.props.onSubmit('');
    this.props.onSubmit(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton
            type="submit"
            style={{ backgroundImage: `url(${searchIcon})` }}
          >
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.input}
            placeholder="Search images and photos"
            onChange={this.handleStateChange}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}
