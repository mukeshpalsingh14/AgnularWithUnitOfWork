import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) {
  }
  logout() {
    this.authService.logout();
  }
  isAuthenticated(): boolean {
    //  console.log(this.authService.isAuthenticated());
    //  console.log(localStorage.getItem('auth-token'));
    return this.authService.isAuthenticated();
  }
}
