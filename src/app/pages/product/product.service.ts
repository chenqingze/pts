import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "./product.model";
import {HttpApi} from "../../core/http/http-api";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  list(): Observable<Product []> {
    return this.httpClient.get<Product []>(HttpApi.products);
  }

  create(product: Product): Observable<any> {
    return this.httpClient.post(HttpApi.products, product);
  }

  get(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${HttpApi.products}/${id}`);
  }

  update(product: Product): Observable<unknown> {
    return this.httpClient.put(`${HttpApi.products}/${product.id}`, product);
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
