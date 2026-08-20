import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  
  // 👈 Your application name signal
  protected readonly title = signal('Employee Management System'); 
  protected readonly currentUrl = signal('');

  // Helper to detect if we are in the browser
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects || event.url);
    });
  }

  isAuthPage(): boolean {
    const url = this.currentUrl();
    return url === '/' || url === '/register' || url === '';
  }

  // 👈 1. Added back the missing getAppLogoLetter() method!
  getAppLogoLetter(): string {
    return this.title().charAt(0).toUpperCase() || 'E';
  }

  // SSR Guard: Only read localStorage if running in browser
  getUserName(): string {
    if (!this.isBrowser) return 'User'; 

    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user.firstName || user.lastName) {
          return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
        }
        return user.name || user.username || user.email || 'User';
      } catch (e) {
        return 'User';
      }
    }
    return 'User';
  }

  // SSR Guard: Only read localStorage if running in browser
  getUserRole(): string {
    if (!this.isBrowser) return 'Staff Member';

    const role = localStorage.getItem('role');
    if (role) {
      return role.charAt(0).toUpperCase() + role.slice(1);
    }
    return 'Staff Member';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    const parts = name.trim().split(' ');
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
    this.router.navigate(['/']);
  }
}