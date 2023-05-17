import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { VeiwmovieComponent } from './veiwmovie/veiwmovie.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'viewMovie', component: VeiwmovieComponent },
  // other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
