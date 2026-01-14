import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './authentication/authentication-service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private authService = inject(AuthenticationService)
  private router = inject(Router)

  loggedIn = this.authService.isAuthenticated()

  constructor() {
    this.authService.isLoggedIn$.subscribe(v => (this.loggedIn = v))
  }

  logout(): void {
    this.authService.clearTokens()
    this.router.navigate(['/authentication'])
  }
}
