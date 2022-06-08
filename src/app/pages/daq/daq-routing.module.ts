import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CertifiedDeviceComponent} from "./certified-device/certified-device.component";
import {CertifiedWarehouseComponent} from "./certified-warehouse/certified-warehouse.component";
import {CertifiedOperatorComponent} from "./certified-operator/certified-operator.component";
import {CertifiedApiComponent} from "./certified-api/certified-api.component";

const routes: Routes = [
    {path: 'certified-device', component: CertifiedDeviceComponent},
    {path: 'certified-operator', component: CertifiedOperatorComponent},
    {path: 'certified-warehouse', component: CertifiedWarehouseComponent},
    {path: 'certified-api', component: CertifiedApiComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DaqRoutingModule {
}
