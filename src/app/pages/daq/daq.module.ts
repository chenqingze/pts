import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DaqRoutingModule} from './daq-routing.module';
import { CertifiedWarehouseComponent } from './certified-warehouse/certified-warehouse.component';
import { CertifiedDeviceComponent } from './certified-device/certified-device.component';
import { CertifiedApiComponent } from './certified-api/certified-api.component';
import { CertifiedOperatorComponent } from './certified-operator/certified-operator.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputModule} from "ng-zorro-antd/input";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
    CertifiedWarehouseComponent,
    CertifiedDeviceComponent,
    CertifiedApiComponent,
    CertifiedOperatorComponent
  ],
    imports: [
        CommonModule,
        DaqRoutingModule,
        NzTableModule,
        NzPageHeaderModule,
        NzFormModule,
        NzSelectModule,
        NzButtonModule,
        NzDatePickerModule,
        NzInputModule,
        SharedModule
    ]
})
export class DaqModule {
}
