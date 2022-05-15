import {NgModule} from '@angular/core';

import {GoodsRoutingModule} from './goods-routing.module';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {SharedModule} from "../../shared/shared.module";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzModalModule} from "ng-zorro-antd/modal";
import {GoodsDetailComponent} from './goods-detail/goods-detail.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzInputModule} from "ng-zorro-antd/input";


@NgModule({
    declarations: [
        GoodsListComponent,
        GoodsDetailComponent
    ],
    imports: [
        SharedModule,
        GoodsRoutingModule,
        NzPageHeaderModule,
        NzTableModule,
        NzButtonModule,
        NzDropDownModule,
        NzModalModule,
        NzFormModule,
        NzImageModule,
        NzInputModule
    ]
})
export class GoodsModule {
}
