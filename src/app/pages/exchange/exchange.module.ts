import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExchangeRoutingModule} from './exchange-routing.module';
import {ExchangeListComponent} from './exchange-list/exchange-list.component';
import {ExchangeDetailComponent} from './exchange-detail/exchange-detail.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";


@NgModule({
  declarations: [
    ExchangeListComponent,
    ExchangeDetailComponent
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    NzPageHeaderModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule,
    NzDescriptionsModule
  ]
})
export class ExchangeModule { }
