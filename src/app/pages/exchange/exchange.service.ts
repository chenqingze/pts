import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpApi} from "../../core/http/http-api";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../shared/product.model";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  list(): Observable<Product []> {
    return this.httpClient.get<Product []>(HttpApi.products);
  }

  create(products: Product): Observable<any> {
    return this.httpClient.post(HttpApi.products, products);
  }

  get(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${HttpApi.products}/${id}`);
  }

  update(products: Product): Observable<unknown> {
    return this.httpClient.put(`${HttpApi.products}/${products.id}`, products);
  }

  qualityInspect(ids: Array<string>): Observable<unknown> {
    return this.httpClient.post(`${HttpApi.baseUrl}/inspect`, {
      ids: ids
    });
  }

  delete(id: string): Observable<unknown> {
    return this.httpClient.delete(`${HttpApi.products}/${encodeURI(id)}`);
  }

  constructor(private httpClient: HttpClient) {
  }
}
