import React, { Component, Fragment } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSongsQuery from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: {
          id
        }
      })
      .then(() => this.props.data.refetch());
  }
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className='material-icons' onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>loading...</div>;
    }
    if (this.props.data.error) console.log(error);
    return (
      <div>
        <ul className='collection'>{this.renderSongs()}</ul>
        <Link to='songs/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongsQuery)(SongList));
