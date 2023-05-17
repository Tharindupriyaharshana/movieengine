import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { DataServiceService } from '../services/data-service.service';
import { Movie } from '../interFaces/movie.model';
import { DataProcessService } from '../services/data-process.service';
import { JobsDataService } from '../services/DataTransfer/jobs-data.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

movieResult:any=[];
isEmpty=false;
  emailFormControl = new FormControl('', [
    Validators.required,
  
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private dataService:DataServiceService, private dataProcess:DataProcessService,private dataShare:JobsDataService,private router: Router) { }

  ngOnInit() {
   
    

    
  }

  submit() {
    const movieName = this.emailFormControl.value;

    this.dataService.getMovieData(movieName);

    this.dataService.getMoviestListener().subscribe(response=>{
      
    console.log(response);
      const movies: Movie= this.dataProcess.extractMovie(response);
      this.movieResult.push(movies);
      console.log(this.movieResult);
    })  
  

  }


  showmore(selectedMovie:Movie){

    console.log(selectedMovie);

    this.dataShare.setMovie(selectedMovie);

    this.router.navigate(['/viewMovie']);

  }

  addToWatchList(movie:Movie){
this.dataProcess.addToWatchlist(movie);
  }
}
