import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poulailler } from '../model/Production';

@Injectable({
  providedIn: 'root'
})
export class PoulaillerserviceService {
  apiUrl = 'http://127.0.0.1:8000/api/poule/poulaillers/';

  constructor(protected http:HttpClient) { }
  getPoulailler(){

   return this.http.get<Poulailler[]>(this.apiUrl);
  }

  addPoulailler(poulailler: Poulailler){
    return this.http.post(this.apiUrl, poulailler);
  }
}
