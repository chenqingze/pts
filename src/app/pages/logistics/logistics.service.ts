import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Logistics} from "../logistics/logistics.model";
import {HttpApi} from "../../core/http/http-api";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LogisticsService {


    list(): Observable<Logistics []> {
        return this.httpClient.get<Logistics []>(HttpApi.logistics);
    }

    create(logistics: Logistics): Observable<any> {
        return this.httpClient.post(HttpApi.logistics, logistics);
    }

    get(id: string): Observable<Logistics> {
        return this.httpClient.get<Logistics>(`${HttpApi.logistics}/${id}`);
    }

    update(logistics: Logistics): Observable<unknown> {
        return this.httpClient.put(`${HttpApi.logistics}/${logistics.id}`, logistics);
    }

    qualityInspect(ids: Array<string>): Observable<unknown> {
        return this.httpClient.post(`${HttpApi.baseUrl}/inspect`, {
            ids: ids
        });
    }

    delete(id: string): Observable<unknown> {
        return this.httpClient.delete(`${HttpApi.logistics}/${encodeURI(id)}`);
    }

    constructor(private httpClient: HttpClient) {
    }
}
