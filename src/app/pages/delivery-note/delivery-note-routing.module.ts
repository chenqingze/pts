import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeliveryNoteListComponent} from "./delivery-note-list/delivery-note-list.component";
import {DeliveryNoteDetailComponent} from "./delivery-note-detail/delivery-note-detail.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'list'},
    {path: 'list', component: DeliveryNoteListComponent},
    {path: 'detail/:id', component: DeliveryNoteDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryNoteRoutingModule {
}
