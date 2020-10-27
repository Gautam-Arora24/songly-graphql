import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client"; // This library doesn't care about the frontend framework/library you are using
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import Songs from "./Components/songs";
import App from "./Components/App";
import CreateSong from "./Components/CreateSong";
import SongDetail from "./Components/SongDetail";

const client = new ApolloClient({
  //THIS IS USED SO THAT APOLLO CAN TELL REACT THAT
  // SOMETHING IS BEING UPDATED AND REACT NEEDS TO RERENDER THE CORRESPONDING COMPONENT
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Songs} />
          <Route path="songs/new" component={CreateSong} />
          <Route path="song/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
