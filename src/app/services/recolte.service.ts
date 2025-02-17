import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alveole } from '../model/stock.model';

@Injectable({
  providedIn: 'root',
})
export class RecolteService {
  private apiUrl = 'http://127.0.0.1:8000/api/poule/alveoles/';

  constructor(private http: HttpClient) {}

  ajouterRecolte(alveole: Alveole): Observable<Alveole> {
    return this.http.post<Alveole>(this.apiUrl, alveole);
  }

  getalevioles(): Observable<Alveole[]> {
    return this.http.get<Alveole[]>(this.apiUrl);
  }

  trouverAlveoleDisponible(poulaillerId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${poulaillerId}/trouver_aviole_disponible/`
    );
  }

  supprimerAlveole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  modifierAlviole(id: number, aleviole: Alveole): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, aleviole);
  }
}
