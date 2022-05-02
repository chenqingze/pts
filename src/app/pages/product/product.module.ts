import {NgModule} from '@angular/core';

import {ProductRoutingModule} from './product-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {SharedModule} from "../../shared/shared.module";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzImageModule} from "ng-zorro-antd/image";


@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddComponent,
    ProductDetailComponent,
    ProductEditComponent,
  ],
    imports: [
        ProductRoutingModule,
        NzTableModule,
        NzButtonModule,
        NzFormModule,
        NzInputModule,
        SharedModule,
        NzSelectModule,
        NzDatePickerModule,
        NzPageHeaderModule,
        NzBreadCrumbModule,
        NzDropDownModule,
        NzInputNumberModule,
        NzUploadModule,
        NzModalModule,
        NzImageModule

    ]
})
export class ProductModule {
}
