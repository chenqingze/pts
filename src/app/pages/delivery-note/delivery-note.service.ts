import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpApi} from "../../core/http/http-api";
import {HttpClient} from "@angular/common/http";
import {DeliveryNote} from "../../shared/delivery-note.model";

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteService {

  list(): Observable<DeliveryNote []> {
    return this.httpClient.get<DeliveryNote []>(HttpApi.deliveryNotes);
  }

  create(deliveryNote: DeliveryNote): Observable<any> {
    return this.httpClient.post(HttpApi.deliveryNotes, deliveryNote);
  }

  get(id: string): Observable<DeliveryNote> {
    return this.httpClient.get<DeliveryNote>(`${HttpApi.deliveryNotes}/${id}`);
  }

  update(deliveryNote: DeliveryNote): Observable<unknown> {
    return this.httpClient.put(`${HttpApi.deliveryNotes}/${deliveryNote.id}`, deliveryNote);
  }

  qualityInspect(ids: Array<string>): Observable<unknown> {
    return this.httpClient.post(`${HttpApi.baseUrl}/inspect`, {
      ids: ids
    });
  }

  delete(id: string): Observable<unknown> {
    return this.httpClient.delete(`${HttpApi.deliveryNotes}/${encodeURI(id)}`);
  }

  constructor(private httpClient: HttpClient) {
  }
}
