import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductAddComponent} from "./product-add/product-add.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'list'},
    {path: 'list', component: ProductListComponent},
    {path: 'add', component: ProductAddComponent},
    {path: 'edit/:id', component: ProductEditComponent},
    {path: 'detail/:id', component: ProductDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {
}
