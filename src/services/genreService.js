import http from "./httpService.js";
import { apiUrl } from "../config.json";
export function getGenres() {
  return http.get(apiUrl + "/genres");
}
