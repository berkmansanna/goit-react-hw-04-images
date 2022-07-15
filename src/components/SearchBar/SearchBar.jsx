import { useState } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handelChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handelSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Empty field. Write something!');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.searchBar}>
      <form className={s.searchForm} onSubmit={handelSubmit}>
        <button className={s.searchFormButton} type="submit">
          <span className={s.searchFormButtonLabel}>Search</span>
        </button>

        <input
          type="text"
          name="query"
          value={query}
          className={s.searchFormInput}
          onChange={handelChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
