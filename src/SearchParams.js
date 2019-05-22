import React from 'react';
import { navigate } from '@reach/router';
import SearchBox from './SearchBox';

class SearchParams extends React.Component {

  handleSearchSubmit() {
    navigate('/');
  }

  render () {
    return (
      <div className="search-route">
        <SearchBox search={this.handleSearchSubmit} />
      </div>
    );
  }
}
export default SearchParams;
