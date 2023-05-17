import { Component, OnInit } from '@angular/core';
import { JobsDataService } from '../services/DataTransfer/jobs-data.service';

@Component({
  selector: 'app-veiwmovie',
  templateUrl: './veiwmovie.component.html',
  styleUrls: ['./veiwmovie.component.scss']
})
export class VeiwmovieComponent implements OnInit {
  movieResult:any=[];
  constructor(private dataShare:JobsDataService) { }

  ngOnInit() {
    const response= this.dataShare.getMovie();
   this.movieResult.push(response);
   console.log(this.movieResult);
  }

}
