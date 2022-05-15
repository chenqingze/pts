import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GoodsListComponent} from "./goods-list/goods-list.component";
import {GoodsDetailComponent} from "./goods-detail/goods-detail.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'list'},
    {path: 'list', component: GoodsListComponent},
    {path: 'detail/:id', component: GoodsDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GoodsRoutingModule {
}
