import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialInfoRoutingModule } from './financial-info-routing.module';
import { FinancialInfoComponent } from './financial-info.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";


@NgModule({
  declarations: [
    FinancialInfoComponent
  ],
    imports: [
        CommonModule,
        FinancialInfoRoutingModule,
        NzTableModule,
        NzPageHeaderModule
    ]
})
export class FinancialInfoModule { }
