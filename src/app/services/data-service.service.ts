import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import{url,apikey}from'../configData/comon.config';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private movieDataUpdate = new Subject<any>();
  constructor(private http:HttpClient) { }


  getMovieData(searchString:string){



    this.http.get<{Data:any}>(url+"?apikey="+apikey+"&t="+searchString+"&y=&plot=full&r=json")
     .subscribe((res) => {
    this.movieDataUpdate .next(res);
     });
  
  }

  getMoviestListener() {
    return this.movieDataUpdate.asObservable();
  }
}
