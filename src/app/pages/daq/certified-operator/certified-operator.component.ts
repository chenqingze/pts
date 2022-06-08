import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-certified-operator',
    templateUrl: './certified-operator.component.html',
    styleUrls: ['./certified-operator.component.css']
})
export class CertifiedOperatorComponent implements OnInit {
    operatorList = [
        {
            code: '202109532',
            name: '李宏良',
            jobTitle: '入库质检',
            AuthenticationMode: '指纹识别',
            organization: '北京亦庄仓库',
            certifiedAt: '2021/9/5'
        }

    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
