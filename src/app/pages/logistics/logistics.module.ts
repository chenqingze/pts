import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogisticsRoutingModule} from './logistics-routing.module';
import {LogisticsListComponent} from './logistics-list/logistics-list.component';
import {LogisticsDetailComponent} from './logistics-detail/logistics-detail.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {SharedModule} from "../../shared/shared.module";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTimelineModule} from "ng-zorro-antd/timeline";
import {NzTagModule} from "ng-zorro-antd/tag";


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
        NzButtonModule,
        NzFormModule,
        NzInputModule,
        SharedModule,
        NzDividerModule,
        NzTimelineModule,
        NzTagModule
    ]
})
export class LogisticsModule {
}
