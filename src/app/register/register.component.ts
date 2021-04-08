import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  registerUser: any = {
    userName: "",
    password: "",
    password2: ""
  };
  private regSub;
  warning: any;
  success: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (this.registerUser.userName !== "" && this.registerUser.password === this.registerUser.password2) {
      this.loading = true;
      this.regSub = this.authService.register(this.registerUser).subscribe(msg => {
        this.success = true;
        this.warning = null;
        this.loading = false;
      }, err => {
        this.success = false;
        this.warning = err.error.message;
        this.loading = false;
      })
    } else if (this.registerUser.password !== this.registerUser.password2) {
      this.warning = "Passwords doesn't match.";
    }
  }

  ngOnDestroy() {
    this.regSub.unsubscribe();
  }
}
