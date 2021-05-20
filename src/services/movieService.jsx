import http from "./httpService.js";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/movies";
function moviesUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getMovies() {
  return http.get(apiEndpoint);
}
export function getMovie(id) {
  return http.get(apiEndpoint + "/" + id);
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(moviesUrl(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}
export function deleteMovie(movie) {
  return http.delete(moviesUrl(movie._id));
}
