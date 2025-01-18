import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserGroupResponse } from '../components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root',
})
export class UsergroupeService {
  private apiUrl = 'http://127.0.0.1:8000/api/core/auth/get-groups/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getGroups() {
    return this.http.get<UserGroupResponse>(this.apiUrl);
  }
}
