import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSongsQuery from '../queries/fetchSongs';
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }
  onFormSubmit(evt) {
    evt.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [{ query: fetchSongsQuery }]
      })
      .then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>Song Title: </label>
          <input
            value={this.state.title}
            onChange={evt => this.setState({ title: evt.target.value })}
          />
        </form>
        <Link to='/' className='btn-floating btn-large red left'>
          <i className='material-icons'>arrow_back </i>
        </Link>
      </div>
    );
  }
}

export default graphql(mutation)(SongCreate);
