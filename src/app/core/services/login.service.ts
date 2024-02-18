import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../models/login-data.model';
import { environment } from 'src/environments/environment';
import { ResponseObject } from '../models/response-object.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _httpClient: HttpClient) {}

  loginUser(userCredentials: LoginData) {
    return this._httpClient.post<ResponseObject>(`${environment.LOGIN_SERVICE_URL}`, userCredentials);
  }
}
