import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  
  releases: any;

  private newReleases;
  constructor(private musicData: MusicDataService) { }

  ngOnInit() {
    this.newReleases = this.musicData.getNewReleases().subscribe(data => {  
      this.releases = data.albums.items;
    });
  }

  ngOnDestroy() {
    this.newReleases.unsubscribe();
  }
}
