import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpApi} from "../../core/http/http-api";
import {HttpClient} from "@angular/common/http";
import {Goods} from "./goods.model";

@Injectable({
    providedIn: 'root'
})
export class GoodsService {

    list(): Observable<Goods []> {
        return this.httpClient.get<Goods []>(HttpApi.goods);
    }

    create(goods: Goods): Observable<any> {
        return this.httpClient.post(HttpApi.goods, goods);
    }

    get(id: string): Observable<Goods> {
        return this.httpClient.get<Goods>(`${HttpApi.goods}/${id}`);
    }

    update(goods: Goods): Observable<unknown> {
        return this.httpClient.put(`${HttpApi.goods}/${goods.id}`, goods);
    }

    qualityInspect(ids: Array<string>): Observable<unknown> {
        return this.httpClient.post(`${HttpApi.baseUrl}/inspect`, {
            ids: ids
        });
    }

    delete(id: string): Observable<unknown> {
        return this.httpClient.delete(`${HttpApi.goods}/${encodeURI(id)}`);
    }

    constructor(private httpClient: HttpClient) {
    }
}
