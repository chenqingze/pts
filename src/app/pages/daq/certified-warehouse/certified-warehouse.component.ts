import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-certified-warehouse',
    templateUrl: './certified-warehouse.component.html',
    styleUrls: ['./certified-warehouse.component.css']
})
export class CertifiedWarehouseComponent implements OnInit {
    warehouseList = [
        {
            code: '2021002',
            name: '北京亦庄仓库',
            position: '北京大兴区亦庄XX',
            owner: '大兴开发区XX',
            level: '五星标准',
            area: '20000M2',
            certifiedOrg: ''
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
