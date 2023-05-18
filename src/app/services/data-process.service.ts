import { Injectable } from "@angular/core";
import { Movie } from "../interFaces/movie.model";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class DataProcessService {
  watchlist: Movie[] = [];
  private watchlistnew = new Subject<any>();

  constructor() {}

  ngOnInit(): void {
    this.loadWatchlistFromLocalStorage();
  }

  extractMovie(response: any): Movie {
    return {
      Title: response.Title,
      Year: response.Year,
      Released: response.Released,
      Genre: response.Genre,
      Director: response.Director,
      Writer: response.Writer,
      Actors: response.Actors,
      Plot: response.Plot,
      Poster: response.Poster,
      Metascore: response.Metascore,
      imdbRating: response.imdbRating,
      imdbID: response.imdbID,
    };
  }

  saveWatchlistToLocalStorage(): void {
    localStorage.setItem("watchlist", JSON.stringify(this.watchlist));
  }

  addToWatchlist(movie: Movie): void {
    const movieExists = this.watchlist.some(
      (item) => item.imdbID === movie.imdbID
    );
    if (!movieExists) {
      this.watchlist.push(movie);
      this.saveWatchlistToLocalStorage();
      this.watchlistnew.next(movie);
    }
  }

  removeFromWatchlist(movie: Movie): void {
    const index = this.watchlist.findIndex(
      (item) => item.imdbID === movie.imdbID
    );
    if (index !== -1) {
      this.watchlist.splice(index, 1);
      this.saveWatchlistToLocalStorage();
    }
  }

  loadWatchlistFromLocalStorage(): void {
    const watchlistData = localStorage.getItem("watchlist");
    if (watchlistData) {
      this.watchlist = JSON.parse(watchlistData);
      this.watchlistnew.next(this.watchlist);
    }
  }

  getAmountWatchList() {
    this.loadWatchlistFromLocalStorage();
    return this.watchlist.length;
  }

  getWatchList() {
    this.loadWatchlistFromLocalStorage();
    return this.watchlist;
  }

  getWatchListListener() {
    return this.watchlistnew.asObservable();
  }
}
