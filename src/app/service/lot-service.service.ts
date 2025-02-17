import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lot } from '../model/Production';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LotServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api/poule/lots';
  constructor(private http: HttpClient) {}

  getLots(id: number): Observable<Lot[]> {
    return this.http.get<Lot[]>(`${this.apiUrl}/${id}/getPoulayerLot/`);
  }

  addLot(lot: Lot): Observable<Lot> {
    return this.http.post<Lot>(`${this.apiUrl}/`, lot);
  }
  actver(id: number): Observable<Lot> {
    return this.http.post<Lot>(`${this.apiUrl}/${id}/active-desactive/`, {});
  }
}
