import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/token/';
  private refreshTokenUrl = 'http://127.0.0.1:8000/api/token/refresh/';
  private accessTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  // Connexion de l'utilisateur
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(this.apiUrl, body).pipe(
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }

  // Stocke les tokens dans le localStorage
  storeTokens(tokens: { access: string; refresh: string }) {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    this.accessTokenSubject.next(tokens.access);
  }

  // Récupère le token d'accès
  getAccessToken(): string | null {
   
    return localStorage.getItem('accessToken');
  }

  // Récupère le token de rafraîchissement
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Rafraîchit le token d'accès
  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    return this.http
      .post<any>(this.refreshTokenUrl, { refresh: refreshToken })
      .pipe(
        catchError((error) => {
          console.error('Refresh token error', error);
          return throwError(error);
        })
      );
  }

  // Déconnexion de l'utilisateur
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.accessTokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Charge le token au démarrage
  private loadToken() {
    const token = this.getAccessToken();
    if (token) {
      this.accessTokenSubject.next(token);
    }
  }

  // Retourne les en-têtes HTTP avec le token
  getHttpHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
}
