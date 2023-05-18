import { Component, OnInit } from "@angular/core";
import { JobsDataService } from "../services/DataTransfer/jobs-data.service";
import { DataProcessService } from "../services/data-process.service";
import { MatSnackBar } from "@angular/material";
import { Movie } from "../interFaces/movie.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-veiwmovie",
  templateUrl: "./veiwmovie.component.html",
  styleUrls: ["./veiwmovie.component.scss"],
})
export class VeiwmovieComponent implements OnInit {
  movieResult: any = [];
  constructor(
    private dataShare: JobsDataService,
    private dataProcess: DataProcessService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const response = this.dataShare.getMovie();
    this.movieResult.push(response);
  }

  addToWatchList(movie: Movie) {
    this.dataProcess.addToWatchlist(movie);
    this.openSnackBar("Watch List Updated", "Dissmiss");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  backtoHome() {
    this.router.navigate(["/"]);
  }
}
