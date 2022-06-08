import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-certified-api',
    templateUrl: './certified-api.component.html',
    styleUrls: ['./certified-api.component.css']
})
export class CertifiedApiComponent implements OnInit {
    apiList = [
        {code: '20876', orgName: '亦庄货物入库采集', type: '仓储数据', connectionType: 'RFID', encryption: '对称加密', keyManage: '集中管理'}
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
