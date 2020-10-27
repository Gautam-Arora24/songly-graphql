import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../Queries/fetchSongs";

class CreateSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }
  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query }], //ALSO HAS A variables PROPERTY FOR QUERY VARIABLES
      })
      .then(() => {
        hashHistory.push("/");
      });
  }
  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
      id
    }
  }
`;

export default graphql(mutation)(CreateSong);
