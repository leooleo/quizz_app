import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionModel } from './question-model';
import { ServerResponse } from './server-response';
import { AnswerModel } from './answer-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAvailableUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${environment.serverUrl}/api/users`);
  }

  getUserQuestions(user: string): Observable<QuestionModel[]> {
    return this.httpClient.get<QuestionModel[]>(`${environment.serverUrl}/api/questions/${user}`);
  }

  sendQuestion(question: QuestionModel): Observable<ServerResponse> {
    return this.httpClient.post<ServerResponse>(`${environment.serverUrl}/api/question/${question.createdByUser}`, question);
  }
}
