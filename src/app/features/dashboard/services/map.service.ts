import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '../../../core/models/Store';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  baseUrl = environment.apiUrl;
  token!: string;

  constructor(private http: HttpClient) {
    this.token = this.#getToken();
  }

  getStores() {
    return this.http.get<Store[]>(`${this.baseUrl}/store`);
  }

  #getToken() {
    return localStorage.getItem('token')!;
  }
}
