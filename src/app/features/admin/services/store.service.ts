import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment.development';

import { Store } from '../../../core/models/Store';
import { Observable } from 'rxjs';

type UploadImageResponse = {
  secureUrl: string;
};

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  baseUrl = environment.apiUrl;
  token!: string;

  constructor(private http: HttpClient) {
    this.token = this.#getToken();
  }

  getStores() {
    return this.http.get<Store[]>(`${this.baseUrl}/store`);
  }

  getStoreById(id: string): Observable<Store> {
    return this.http.get<Store>(`${this.baseUrl}/store/${id}`);
  }

  uploadStoreImage(formData: FormData): Observable<UploadImageResponse> {
    const headers = this.#setHeaders();

    return this.http.post<UploadImageResponse>(
      `${this.baseUrl}/files/store`,
      formData,
      { headers },
    );
  }

  addNewStore(store: Store) {
    const headers = this.#setHeaders();

    return this.http.post(`${this.baseUrl}/store`, store, { headers });
  }

  editStore(id: string, store: Store) {
    const headers = this.#setHeaders();

    return this.http.patch<Store>(`${this.baseUrl}/store/${id}`, store, {
      headers,
    });
  }

  deleteStore(id: string) {
    const headers = this.#setHeaders();

    return this.http.delete(`${this.baseUrl}/store/${id}`, { headers });
  }

  #getToken() {
    return localStorage.getItem('token')!;
  }

  #setHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
}
