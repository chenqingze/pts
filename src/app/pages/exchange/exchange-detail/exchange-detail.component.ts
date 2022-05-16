import {Component, OnInit} from '@angular/core';
import {ExchangeService} from "../exchange.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Exchange} from "../exchange.model";

@Component({
    selector: 'app-exchange-detail',
    templateUrl: './exchange-detail.component.html',
    styleUrls: ['./exchange-detail.component.css']
})
export class ExchangeDetailComponent implements OnInit {

    exchange!: Exchange;

    constructor(private exchangeService: ExchangeService, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.exchangeService.get(params['id']).subscribe(data => {
                this.exchange = data;
            })
        });
    }

    ngOnInit(): void {

    }
}
