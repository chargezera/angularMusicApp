import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any>;
  private favs;
  private del;
  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit() {
    this.favs = this.musicData.getFavourites().subscribe(data => {
      this.favourites = data.tracks;
      console.log(this.favourites);
    });
  }

  removeFromFavourites(id) {
    this.favs = this.musicData.removeFromFavourites(id).subscribe(data => {
      this.favourites = data.tracks;
    });
  }

  ngOnDestroy() {
    this.favs.unsubscribe();
  }
}
