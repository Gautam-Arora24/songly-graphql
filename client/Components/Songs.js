import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../Queries/fetchSongs";
import { Link } from "react-router";
import gql from "graphql-tag";
class Songs extends Component {
  onDeleteSong(id) {
    this.props.mutate({ variables: { id }, refetchQueries: [{ query }] });
  }

  renderSongs() {
    return this.props.data.songs.map((song) => {
      return (
        <li className="collection-item" key={song.id}>
          <Link to={`song/${song.id}`}>{song.title}</Link>
          <i
            className="material-icons"
            onClick={() => this.onDeleteSong(song.id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) return <h2>Loading</h2>;
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link className="btn-floating btn-large red right" to="/songs/new">
          <i className="material-icons">add</i>
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

// WE CAN ONLY WIRE UP ONE MUTATION WITH A QUERY NOT MULTIPLE
export default graphql(mutation)(graphql(query)(Songs));
