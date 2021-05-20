import {} from "./services/fakeMovieService";
import React from "react";
import { Redirect, Route, Switch } from "react-router";

import Movies from "./components/movies";
import Navbar from "./components/common/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route path="/movies/:_id" component={MovieForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/movies" component={Movies} />

        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
