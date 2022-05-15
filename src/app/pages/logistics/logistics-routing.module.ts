import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogisticsListComponent} from "./logistics-list/logistics-list.component";
import {LogisticsDetailComponent} from "./logistics-detail/logistics-detail.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'list'},
    {path: 'list', component: LogisticsListComponent},
    {path: 'detail/:id', component: LogisticsDetailComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogisticsRoutingModule {
}
