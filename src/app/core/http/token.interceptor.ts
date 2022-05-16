import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../../auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const loggedUser = this.authService.loggedUser;
        if (loggedUser && loggedUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${loggedUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}
