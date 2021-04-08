import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: any;
  artist: any;
  id: any;
  private routeSub;
  private artistFound;
  private artistAlbums;
  constructor(private musicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.artistFound = this.musicData.getArtistById(this.id).subscribe(data => {
      this.artist = data;
    });
    this.artistAlbums = this.musicData.getAlbumsByArtistId(this.id).subscribe(data => {
      let e = data.items.filter((item, index) => data.items.findIndex((item2) => item2.name === item.name) === index);
      this.albums = e;
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.artistFound.unsubscribe();
    this.artistAlbums.unsubscribe();
  }
}
