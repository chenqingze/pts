import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryNoteService} from "../delivery-note.service";
import {DeliveryNote} from "../../../shared/delivery-note.model";

@Component({
    selector: 'app-delivery-note-detail',
    templateUrl: './delivery-note-detail.component.html',
    styleUrls: ['./delivery-note-detail.component.css']
})
export class DeliveryNoteDetailComponent implements OnInit {

    deliveryNote!: DeliveryNote;

    constructor(private deliveryNoteService: DeliveryNoteService, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.deliveryNoteService.get(params['id']).subscribe(data => {
                this.deliveryNote = data;
            })
        });
    }

    ngOnInit(): void {
    }

}
