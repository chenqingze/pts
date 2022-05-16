import {Component, OnInit} from '@angular/core';
import {ExchangeService} from "../exchange.service";
import {Exchange} from "../exchange.model";

@Component({
    selector: 'app-exchange-list',
    templateUrl: './exchange-list.component.html',
    styleUrls: ['./exchange-list.component.css']
})
export class ExchangeListComponent implements OnInit {

    exchangeList: Exchange[] = [];

    constructor(private exchangeService: ExchangeService) {
    }

    ngOnInit(): void {
        this.exchangeService.list().subscribe(data => this.exchangeList = data);
    }

}
