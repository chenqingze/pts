import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogisticsRoutingModule} from './logistics-routing.module';
import {LogisticsListComponent} from './logistics-list/logistics-list.component';
import {LogisticsDetailComponent} from './logistics-detail/logistics-detail.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
    declarations: [
        LogisticsListComponent,
        LogisticsDetailComponent
    ],
    imports: [
        CommonModule,
        LogisticsRoutingModule,
        NzPageHeaderModule,
        NzTableModule,
        NzModalModule,
        NzButtonModule
    ]
})
export class LogisticsModule {
}
