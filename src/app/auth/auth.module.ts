import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {SharedModule} from "../shared/shared.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';


@NgModule({
    declarations: [
        ForgotPasswordComponent,
        ResetPasswordComponent,
        SignUpComponent,
        SignInComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        NzFormModule,
        NzInputModule,
        NzCheckboxModule,
        SharedModule,
        NzButtonModule
    ]
})
export class AuthModule {
}
