import {Component, OnInit} from '@angular/core';
import {DeliveryNote, FinancialInfo} from "../../shared/delivery-note.model";
import {DeliveryNoteService} from "../delivery-note/delivery-note.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-financial-info',
    templateUrl: './financial-info.component.html',
    styleUrls: ['./financial-info.component.css']
})
export class FinancialInfoComponent implements OnInit {
    deliveryNoteList: DeliveryNote[] = [];
    constructor(private deliveryNoteService: DeliveryNoteService) {
        this.deliveryNoteService.list().subscribe(data=>{
            this.deliveryNoteList = data;
        })
    }

    ngOnInit(): void {
    }

}
