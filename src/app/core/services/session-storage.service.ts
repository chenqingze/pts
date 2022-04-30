import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private readonly APP_PREFIX = `${environment.appName}-`;
  private storage: any;

  constructor() {
    this.storage = sessionStorage;
  }

  public getItem(key: string): any {
    const item = this.storage.getItem(`${this.APP_PREFIX}${key}`);
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  public setItem(key: string, value: any) {
    try {
      this.storage.setItem(`${this.APP_PREFIX}${key}`, JSON.stringify(value));
    } catch (e) {
      this.storage.setItem(`${this.APP_PREFIX}${key}`, value as string);
    }
  }

  public removeItem(key: string) {
    this.storage.removeItem(`${this.APP_PREFIX}${key}`);
  }

  public clear() {
    this.storage.clear();
  }
}
