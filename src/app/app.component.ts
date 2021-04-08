/**********************************************************************************  
 * WEB422 –Assignment 05
 * I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 * assignment has been copied manually or electronically from any other source (including web sites) or
 * distributed to other students.
 * 
 * Name: Zhanibek Sagyndyk Student ID: 168901189 Date: 2021/03/26
 * 
 *********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchString: string;
  title = 'web422-a5';
  token: any;
  private rouSub;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.rouSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.authService.readToken();
      }
    });

  }

  handleSearch() {
    console.log(this.searchString);
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } })
    this.searchString = "";
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  ngOnDestroy() {
    this.rouSub.unsubscribe();
  }
}
