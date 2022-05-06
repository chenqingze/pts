import {NgModule} from '@angular/core';

import {GoodsRoutingModule} from './goods-routing.module';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {SharedModule} from "../../shared/shared.module";
import {GoodsDetialComponent} from './goods-detial/goods-detial.component';


@NgModule({
  declarations: [
    GoodsListComponent,
    GoodsDetialComponent
  ],
  imports: [
    SharedModule,
    GoodsRoutingModule
  ]
})
export class GoodsModule {
}
