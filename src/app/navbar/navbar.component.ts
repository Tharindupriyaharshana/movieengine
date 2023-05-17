import { Component, OnInit } from '@angular/core';
import { DataProcessService } from '../services/data-process.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 watchlistCount=0;
  constructor( private dataProcess:DataProcessService,private router: Router ) { }

  ngOnInit() {
    this.watchlistCount=this.dataProcess.getAmountWatchList()
    console.log(this.watchlistCount);
  }

  navigateToWatchlist(): void {
    this.router.navigate(['/watchlist']);
  }
  
  backtoHome(){
    this.router.navigate(['/']);
  }

}
