import { Component, OnInit } from '@angular/core';
import { DataProcessService } from '../services/data-process.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Movie } from '../interFaces/movie.model';
import { JobsDataService } from '../services/DataTransfer/jobs-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  movieResult:any=[];
  constructor(private dataProcess:DataProcessService,private dialog: MatDialog,private dataShare:JobsDataService,private router: Router) { }

  ngOnInit() {
    this.dataProcess.loadWatchlistFromLocalStorage()
    const response= this.dataProcess.getWatchList();
    this.movieResult.push(response);
    console.log(this.movieResult);
  }

removemovie(movie){
  this.openConfirmDialog(movie);
}
  removeItem(movie:Movie){
this.dataProcess.removeFromWatchlist(movie);
  }

  openConfirmDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to remove this movie from the watchlist?',
        movie: movie
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed, remove the movie from the watchlist
        this.removeItem(movie);
      }
    });
  }
  
  showmore(selectedMovie:Movie){

    console.log(selectedMovie);

    this.dataShare.setMovie(selectedMovie);

    this.router.navigate(['/viewMovie']);

  }
}
