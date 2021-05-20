import React from "react";
import Form from "./common/form";

import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  constructor(props) {
    super();
    this.state = {
      data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
      genres: [],
      errors: {},
    };
    this.schema = {
      _id: Joi.string(),
      title: Joi.string().required().label("Title"),
      genreId: Joi.string().required().label("Genre"),
      numberInStock: Joi.number()
        .required()
        .min(1)
        .max(100)
        .label("Number in Stock"),
      dailyRentalRate: Joi.number()
        .required()
        .min(0)
        .max(10)
        .label("Daily Rental Rate"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.validateProperty = this.validateProperty.bind(this);
    // this.populateGenre = this.populateGenre.bind(this);
  }
  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovies() {
    const movieId = this.props.match.params._id;
    if (movieId === "new") {
      return;
    }
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    this.populateGenre();
    this.populateMovies();
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  async doSubmit() {
    const data = { ...this.state.data };
    // console.log(data);
    await saveMovie(data);

    this.props.history.push("/movies");
  }
  render() {
    return (
      <div className="container">
        <h1>Movie Forms</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
