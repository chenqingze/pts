import {Injectable} from '@angular/core';
import {HttpApi} from "../core/http/http-api";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LocalStorageService} from "../core/services/local-storage.service";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly LOGGED_USER = 'logged_user';

  /**
   * 登录
   * @param loginFormRawValue
   */
  login(loginFormRawValue: User): void {
    console.debug(HttpApi.login);
    this.httpClient.post<User>(HttpApi.login, loginFormRawValue).subscribe(user => {
      console.log(user);
      this.localStorageService.setItem(this.LOGGED_USER, user);
      this.router.navigate(['']).then(r => console.debug('=== 登录成功后，跳转主页 ===>', r));
    });
  }

  /**
   * 登出
   */
  logout(): void {
    /* this.httpClient.post(HttpApi.logout, {}).pipe(finalize(() => {
       this.router.navigateByUrl('/login').then();
     })).subscribe();*/
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getItem(this.LOGGED_USER);
  }

  get loggedUser(): User {
    return this.localStorageService.getItem(this.LOGGED_USER);
  }


  constructor(private httpClient: HttpClient, private router: Router, private localStorageService: LocalStorageService) {
  }
}
