import { Injectable } from "@angular/core";
import { Movie } from "./../../interFaces/movie.model";
@Injectable({
  providedIn: "root",
})
export class JobsDataService {
  private selectedMovie: Movie;
  constructor() {}

  public setMovie(movie: Movie) {
    this.selectedMovie = movie;
    console.log(this.selectedMovie);
  }

  public getMovie() {
    console.log(this.selectedMovie);
    return this.selectedMovie;
  }
}
