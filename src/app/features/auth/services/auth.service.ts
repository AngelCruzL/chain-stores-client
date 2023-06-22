import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserData, LoginUserData, UserResponse } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  readonly #baseUrl = environment.apiUrl;

  login(data: LoginUserData): Observable<UserResponse> {
    return this.#http.post<UserResponse>(`${this.#baseUrl}/auth/login`, data);
  }

  register(data: CreateUserData): Observable<UserResponse> {
    return this.#http.post<UserResponse>(
      `${this.#baseUrl}/auth/register`,
      data,
    );
  }

  checkToken(token: string): Observable<UserResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.#http.get<UserResponse>(`${this.#baseUrl}/auth/check-token`, {
      headers,
    });
  }
}
