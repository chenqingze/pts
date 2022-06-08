import {Component, OnInit} from '@angular/core';
import {DeliveryNote, Owner} from "../../../shared/delivery-note.model";
import {DeliveryNoteService} from "../delivery-note.service";

@Component({
    selector: 'app-delivery-note-list',
    templateUrl: './delivery-note-list.component.html',
    styleUrls: ['./delivery-note-list.component.css']
})
export class DeliveryNoteListComponent implements OnInit {
    isVisible = false;
    title = "";
    deliveryNoteList: DeliveryNote[] = [];
    model: number = 0;
    tracingList = [{
        "step": "165地块丝苗米收割",
        "dateTime": "2021/11/15 15:30"
    },
        {
            "step": "基地晾晒场脱壳",
            "dateTime": "2021/11/18 18:20"
        },
        {
            "step": "金凤凰仓库8号地磅称重",
            "dateTime": "2021/11/19 10:20"
        },
        {
            "step": "金凤凰仓库9号分拣机分拣",
            "dateTime": "2021/11/19 10:30"
        },
        {
            "step": "金凤凰仓库10号打包机分装",
            "dateTime": "2021/11/19 11:10"
        },
        {
            "step": "金凤凰仓库10号抽查质检",
            "dateTime": "2021/11/19 11:10"
        },
        {
            "step": "金凤凰仓库10号8号货位入库",
            "dateTime": "2021/11/19 11:20"
        },
        {
            "step": "165地块丝苗米信息上链",
            "dateTime": "2021/11/19 11:30"
        },
        {
            "step": "165地块仓单生成",
            "dateTime": "2021/11/19 11:50"
        }
    ];
    owner: Owner = {
        companyName: "广州金凤凰米业",
        uscc: 'XXXXXXX',
        businessTerm: '2018-07-03 至 无固定期限',
        companyType: '有限责任公司(自然人投资或控股)',
        location: '广东省广州市XXXX',
        generalItem: '农产品种植、农产品仓储、贸易',
        registeredCapital: '1000万',
        establishmentDate: '2018年月3日'
    };

    constructor(private deliveryNoteService: DeliveryNoteService) {
    }

    ngOnInit(): void {
        this.deliveryNoteService.list().subscribe(data => this.deliveryNoteList = data);
    }

    showTracingModal(id: string): void {
        this.model = 0;
        this.isVisible = true;
        this.title = '仓单生成溯源';
        this.deliveryNoteService.get(id).subscribe(data => {
            this.tracingList = data.tracingList;
        });
    }

    showOwnerModal(id: string): void {
        this.model = 1;
        this.isVisible = true;
        this.title = '所有者信息';
        this.deliveryNoteService.get(id).subscribe(data => {
            this.owner = data.owner;
        });
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }
}
