import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated:boolean=false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user;
    })
  }

  //Çıkış Yap
  onLogout(){
    this.authService.logout();
  }

}
