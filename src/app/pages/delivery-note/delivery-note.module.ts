import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DeliveryNoteRoutingModule} from './delivery-note-routing.module';
import {DeliveryNoteListComponent} from './delivery-note-list/delivery-note-list.component';
import {DeliveryNoteDetailComponent} from './delivery-note-detail/delivery-note-detail.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";

@NgModule({
    declarations: [
        DeliveryNoteListComponent,
        DeliveryNoteDetailComponent
    ],
    imports: [
        CommonModule,
        DeliveryNoteRoutingModule,
        NzPageHeaderModule,
        NzTableModule,
        NzDescriptionsModule,
        NzButtonModule,
        NzModalModule
    ]
})
export class DeliveryNoteModule {
}
