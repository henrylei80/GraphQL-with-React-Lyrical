import React, { Component } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import Spinner from './Spinner';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    if (!song) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
    return (
      <div>
        <h3> {song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
        <Link to='/' className='btn-floating btn-large red left'>
          <i className='material-icons'>arrow_back </i>
        </Link>
      </div>
    );
  }
}
const query = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
export default graphql(query, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
