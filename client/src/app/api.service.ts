import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAvailableUsers(): Observable<UserModel[]> {
  return this.httpClient.get<UserModel[]>(`${environment.serverUrl}/api/available-users`);
  }
}
