import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LayoutGapStyleBuilder } from '@angular/flex-layout';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  user: any = {
    userName: "",
    password: "",
    _id: null
  };
  warning: any;
  loading: boolean = false;
  private logSub;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.user.userName !== "" && this.user.password !== "") {
      this.loading = true;
      this.logSub = this.authService.login(this.user).subscribe(success => {
        this.loading = false;
        localStorage.access_token = success.token;
        this.router.navigate(['/newReleases']);
      }, err => {
        this.warning = err.error.message;
        this.loading = false;
      })
    }
  }

  ngOnDestroy() {
    this.logSub?.unsubscribe();
  }
}
