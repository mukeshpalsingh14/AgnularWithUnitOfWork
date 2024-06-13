import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:7075/api/Products';
  constructor(private httpClient: HttpClient, private router: Router) { }
  getProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getProduct(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  createProduct(file: File, product: any): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('files', file, file.name);
    for (let key in product) {
      if (product.hasOwnProperty(key)) {
        formData.append(key, product[key]);
      }
    }

    return this.httpClient.post(`${this.baseUrl}`, formData);
  }

  updateProduct(id: number,file: File, value: any): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('files', file, file.name);
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        formData.append(key, value[key]);
      }
    }
    return this.httpClient.put(`${this.baseUrl}`, formData);
  }
}
