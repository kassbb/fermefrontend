import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductionserviceService {
  apiUrl = 'http://127.0.0.1:8000/api/poule/productions';
  constructor(protected http: HttpClient) {}

  getProductionByLot(id: number) {
    return this.http.get(`${this.apiUrl}/by-lot/${id}/`);
  }

  addProduction(production: any) {
    return this.http.post(`${this.apiUrl}/`, production);
  }
}
