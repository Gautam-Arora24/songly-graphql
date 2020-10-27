import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongById from "../Queries/fetchSongById";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    if (!song) {
      return <div>Loading..</div>;
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

// This syntax is basically used when we want to fetch something from url(id here)
export default graphql(fetchSongById, {
  options: (props) => {
    return {
      variables: {
        id: props.params.id,
      },
    };
  },
})(SongDetail);
