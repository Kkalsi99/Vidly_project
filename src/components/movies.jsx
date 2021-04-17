import React, { Component } from "react";
import { deleteMovie, getMovies, getMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
class Movies extends Component {
  constructor(props) {
    super();
    this.state = {
      movies: [],
      genres: [],
      sortColumn: { path: "title", order: "asc" },
      pageSize: 4,
      currentPage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGenreSelect = this.handleGenreSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genres });
  }
  handleSort(sortColumn) {
    this.setState({ sortColumn });
  }
  handleDelete(id) {
    this.setState(deleteMovie(id));
  }
  handleLike(id) {
    const movies = getMovies();
    const movie = getMovie(id);
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  }
  handlePageChange(page) {
    this.setState({ currentPage: page });
  }
  handleGenreSelect(genre) {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }
  getPageData() {
    const filteredMovies =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(
      sortedMovies,
      this.state.currentPage,
      this.state.pageSize
    );
    return { totalCount: filteredMovies.length, movies: movies };
  }
  render() {
    const { totalCount, movies } = this.getPageData();
    let count = this.state.movies.length;
    return count === 0 ? (
      "There no Movies in the Database"
    ) : (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>showing {totalCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
