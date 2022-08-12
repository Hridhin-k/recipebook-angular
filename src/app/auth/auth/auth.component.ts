import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponceData, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
  //styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn = true;
  isLoading = false;
  error: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<AuthResponceData>
    this.isLoading = true;
    if (this.isLoggedIn) {
      authObs = this.authService.login(email, password)
    }
    else {
      //console.log(form.value)
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(resData => {
      console.log(resData)
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
      (errorMessage) => {
        //console.log(errorMessage)
        this.error = errorMessage
        this.isLoading = false
      })
    form.reset();
  }
}

