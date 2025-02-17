import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  apiUrl='http://127.0.0.1:8000/api/core/get-current-user/'

  constructor(protected http:HttpClient) { }
  getCurrentUser(){
    return this.http.get(this.apiUrl);
  }
}
