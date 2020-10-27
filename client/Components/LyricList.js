import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricList extends Component {
  constructor(props) {
    super(props);
  }

  onLike(id, likes) {
    console.log(id);
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        //OPTIMISTIC UPDATE THE UI IS USED FOR UPDATING THE UI FIRST BEFORE
        //GETTING THE RESPONSE FROM SERVER.
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  }
  render() {
    console.log(this.props);
    return (
      <ul className="collection">
        {this.props.lyrics.map(({ id, content, likes }) => {
          return (
            <li className="collection-item" key={id}>
              {content}
              <div className="vote-box">
                <i
                  className="material-icons"
                  onClick={() => this.onLike(id, likes)}
                >
                  thumb_up
                </i>
                {likes}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      likes
      id
      content
    }
  }
`;

export default graphql(mutation)(LyricList);
