import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  results: any;
  searchQuery: any;
  query: any;
  private routeSub;
  private artistFound;
  constructor(private musicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.queryParams.subscribe(queryParams => {
      this.searchQuery = queryParams['q'];
      this.artistFound = this.musicData.searchArtists(this.searchQuery).subscribe(data => {
        let e = data.artists.items.filter(item => item.images.length > 0);
        this.results = e;
        console.log(this.results);
      });
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.artistFound.unsubscribe();
  }

}
