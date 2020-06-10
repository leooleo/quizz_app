import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAvailableUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>('http://localhost:8080/api/available-users');
  }
}
