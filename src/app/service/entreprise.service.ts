import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise } from '../model/Production';

@Injectable({
  providedIn: 'root',
})
export class EntrepriseService {
  apiUrl = 'http://127.0.0.1:8000/api/core/entreprise';

  constructor(protected http: HttpClient) {}

  getMyEntreprise() {
    return this.http.get(`${this.apiUrl}/myentreprise/`);
  }
  updateEntreprise(id: number, entreprise: Entreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.apiUrl}/${id}/`, entreprise, {
      withCredentials: true,
    });
  }
  // http://127.0.0.1:8000/api/core/entreprise/1/
}
