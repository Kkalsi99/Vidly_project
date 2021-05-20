import React, { Component } from "react";
import { deleteMovie, getMovies, getMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Search from "./common/search";
import { toast } from "react-toastify";

class Movies extends Component {
  constructor(props) {
    super();
    this.state = {
      movies: [],
      genres: [],
      sortColumn: { path: "title", order: "asc" },
      pageSize: 4,
      searchQuery: "",
      selectedGenre: null,
      currentPage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGenreSelect = this.handleGenreSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genre" }, ...data];
    const { data: movies } = await getMovies();

    this.setState({
      movies: movies,
      genres: genres,
    });
  }
  handleSort(sortColumn) {
    this.setState({ sortColumn });
  }
  async handleDelete(movie) {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Movie not Found");
        this.setState({ movies: originalMovies });
      }
    }
  }
  handleLike(id) {
    const movies = [...this.state.movies];
    const movie = getMovie(id);
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  }
  handlePageChange(page) {
    this.setState({ currentPage: page });
  }
  handleGenreSelect(genre) {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  }
  handleSearch(query) {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  }
  getPageData() {
    const {
      selectedGenre,
      searchQuery,
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize,
    } = this.state;
    let filteredMovies = allMovies;
    if (this.state.searchQuery) {
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filteredMovies =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    }
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);
    return { totalCount: filteredMovies.length, movies: movies };
  }
  render() {
    const { totalCount, movies } = this.getPageData();
    let count = this.state.movies.length;
    return count === 0 ? (
      <div className="col">
        <p>There no Movies in the Database</p>
        <Link
          to="/movies/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          Add Movie
        </Link>
      </div>
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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <p>showing {totalCount} movies in the database</p>
          <Search onChange={this.handleSearch} />
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
