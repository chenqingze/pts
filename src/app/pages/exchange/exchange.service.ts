import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Exchange} from "../exchange/exchange.model";
import {HttpApi} from "../../core/http/http-api";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  list(): Observable<Exchange []> {
    return this.httpClient.get<Exchange []>(HttpApi.exchange);
  }

  create(exchange: Exchange): Observable<any> {
    return this.httpClient.post(HttpApi.exchange, exchange);
  }

  get(id: string): Observable<Exchange> {
    return this.httpClient.get<Exchange>(`${HttpApi.exchange}/${id}`);
  }

  update(exchange: Exchange): Observable<unknown> {
    return this.httpClient.put(`${HttpApi.exchange}/${exchange.id}`, exchange);
  }

  qualityInspect(ids: Array<string>): Observable<unknown> {
    return this.httpClient.post(`${HttpApi.baseUrl}/inspect`, {
      ids: ids
    });
  }

  delete(id: string): Observable<unknown> {
    return this.httpClient.delete(`${HttpApi.exchange}/${encodeURI(id)}`);
  }

  constructor(private httpClient: HttpClient) {
  }
}
