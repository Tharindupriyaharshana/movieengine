import { Component, OnInit } from '@angular/core';
import { DataProcessService } from '../services/data-process.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  movieResult:any=[];
  constructor(private dataProcess:DataProcessService) { }

  ngOnInit() {
    this.dataProcess.loadWatchlistFromLocalStorage()
    const response= this.dataProcess.getWatchList();
    this.movieResult.push(response);
    console.log(this.movieResult);
  }

}
