import gql from "graphql-tag";

// Template String to make the query in a valid Javascript code
export default gql`
  {
    songs {
      id
      title
    }
  }
`;
