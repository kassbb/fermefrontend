// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      // L'utilisateur est authentifié, autoriser l'accès
      return true;
    } else {
      // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
