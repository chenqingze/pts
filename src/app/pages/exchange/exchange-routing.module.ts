import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExchangeListComponent} from "./exchange-list/exchange-list.component";
import {ExchangeDetailComponent} from "./exchange-detail/exchange-detail.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {path: 'list', component: ExchangeListComponent},
    {path: 'detail/:id', component: ExchangeDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExchangeRoutingModule {
}
