import Like from "./common/like";
import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  constructor() {
    super();
    this.columns = [
      {
        path: "title",
        label: "Title",
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Title" },
      { path: "dailyRentalRate", label: "Title" },
      {
        key: "like",
        content: (movie) => (
          <Like
            onClick={() => this.props.onLike(movie._id)}
            liked={movie.liked}
          />
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        ),
      },
    ];
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
