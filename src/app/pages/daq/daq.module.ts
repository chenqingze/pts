import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DaqRoutingModule} from './daq-routing.module';
import { CertifiedWarehouseComponent } from './certified-warehouse/certified-warehouse.component';
import { CertifiedDeviceComponent } from './certified-device/certified-device.component';
import { CertifiedApiComponent } from './certified-api/certified-api.component';
import { CertifiedOperatorComponent } from './certified-operator/certified-operator.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";


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
        NzPageHeaderModule
    ]
})
export class DaqModule {
}
