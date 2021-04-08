import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any;
  id: any;
  private routeSub;
  private albumFound;
  private added;
  constructor(private musicData: MusicDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.albumFound = this.musicData.getAlbumById(this.id).subscribe(data => {
      this.album = data;
    });

  }

  addToFavourites(id) {
    this.added = this.musicData.addToFavourites(id).subscribe(data => {
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    }, err => {
      this.snackBar.open("Unable to song to Favourites", "OK", { duration: 1500 });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.albumFound.unsubscribe();
  }
}
