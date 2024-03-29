import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {MainComponent} from '../pages/main/main.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {TokenInterceptor} from "./http/token.interceptor";
import {ErrorInterceptor} from "./http/error.interceptor";
import {NzMessageService} from "ng-zorro-antd/message";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    // angular
    HttpClientModule,
    RouterModule,
    // custom
    SharedModule.forRoot(),
    NzLayoutModule,
    NzMenuModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: NzMessageService}
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
