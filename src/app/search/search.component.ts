import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { DataServiceService } from "../services/data-service.service";
import { Movie } from "../interFaces/movie.model";
import { DataProcessService } from "../services/data-process.service";
import { JobsDataService } from "../services/DataTransfer/jobs-data.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  movieResult: any = [];
  isEmpty = false;
  private unsubscribe$ = new Subject<void>();
  movieFormControl = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private dataService: DataServiceService,
    private dataProcess: DataProcessService,
    private dataShare: JobsDataService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  // unsubscription done according to reveiw.

  submit() {
    this.isEmpty = false;
    const movieName = this.movieFormControl.value;
    this.dataService.getMovieData(movieName);

    this.dataService
      .getMoviestListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response.Response === "False") {
          this.isEmpty = true;
          this.movieResult.length = 0;
        } else {
          const movies: Movie = this.dataProcess.extractMovie(response);
          this.movieResult.length = 0;
          this.movieResult.push(movies);
        }
      });
  }

  showmore(selectedMovie: Movie) {
    this.dataShare.setMovie(selectedMovie);

    this.router.navigate(["/viewMovie"]);
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
