import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-certified-device',
    templateUrl: './certified-device.component.html',
    styleUrls: ['./certified-device.component.css']
})
export class CertifiedDeviceComponent implements OnInit {
    deviceList = [
        {code: '20987', name: '地磅', type: '计量设备', owner: '亦庄仓库', certifiedAt: '2021/1/2', institutions: '中检标准'},
        {code: '20888', name: '打包机', type: '分拣设备', owner: '亦庄仓库', certifiedAt: '2021/1/2', institutions: '中检标准'},
        {code: '20889', name: '叉车', type: '运输设备', owner: '亦庄仓库', certifiedAt: '2021/1/2', institutions: '中检标准'},
        {code: '20890', name: 'RFID电子标签', type: '标签设备', owner: '亦庄仓库', certifiedAt: '2021/1/2', institutions: '中检标准'},
        {code: '20891', name: '电子围栏', type: '货位设备', owner: '亦庄仓库', certifiedAt: '2021/1/2', institutions: '中检标准'},
        {code: '20892', name: '摄像机', type: '安全设备', owner: '亦庄仓库', certifiedAt: '2021/1/2', institutions: '中检标准'},
        {code: '20893', name: '温度传感器', type: '感知设备', owner: '亦庄仓库', certifiedAt: '2021/1/2', institutions: '中检标准'}
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

}
