import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthResponse } from './auth-response.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = false;
  error: string;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {}

  //click
  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  //alert kapat
  closeDialog($event:any){
    console.log($event);
    this.error=null;
  }

  //Üye kayıt ve giriş formu
  onSubmit(form: NgForm) {
    if (form.invalid)//inputun içindeki boş değerlerin kayıt olmasını engeller.
      return;

    const email = form.value.email;
    const password = form.value.password;

    let authResponse: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authResponse = this.authService.login(email, password);
    } else {
      authResponse = this.authService.signUp(email, password);
    }
    authResponse.subscribe(
      (response) => {
        this.router.navigate(['/movies'])
      },
      (err) => {
        this.error = err;
      }
    );
    form.reset();
  }
}
