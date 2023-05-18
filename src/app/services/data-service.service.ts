import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { url, apikey } from "../configData/comon.config";

@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  private movieDataUpdate = new Subject<any>();
  constructor(private http: HttpClient) {}

  getMovieData(searchString: string) {
    // Modified after sudguestion
    const params = new HttpParams()
      .set("apikey", apikey)
      .set("t", searchString)
      .set("plot", "full")
      .set("r", "r");

    this.http.get<any>(url, { params }).subscribe((res) => {
      this.movieDataUpdate.next(res);
    });

    // this was my implementation

    // this.http.get<{Data:any}>(url+"?apikey="+apikey+"&t="+searchString+"&y=&plot=full&r=r")
    //  .subscribe((res) => {
    // this.movieDataUpdate .next(res);
    //  });
  }

  getMoviestListener() {
    return this.movieDataUpdate.asObservable();
  }
}
