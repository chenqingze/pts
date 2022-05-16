import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Logistics} from "../../goods/goods.model";
import {ActivatedRoute, Router} from "@angular/router";
import {QualityStatus} from "../../product/product.model";
import {LogisticsService} from "../logistics.service";

@Component({
    selector: 'app-logistics-detail',
    templateUrl: './logistics-detail.component.html',
    styleUrls: ['./logistics-detail.component.css']
})
export class LogisticsDetailComponent implements OnInit {
    logisticsForm: FormGroup;
    transferList: Logistics[] = [];

    constructor(private fb: FormBuilder, private logisticsService: LogisticsService, private router: Router, private route: ActivatedRoute) {
        this.logisticsForm = this.fb.group({
            id: [''],
            name: ['', Validators.required], //Name of Goods  产品名称/品名
            code: ['', Validators.required], // 编号
            // Model No. /Part number ( P/N), P/N# 件号
            batchNo: ['', Validators.required],// 产品批号
            // Serial Number, S/N#  序列号
            specs: ['', Validators.required], // 产品规格 Specifications, Specs
            countryOFOrigin: ['', Validators.required], // 原产地（国）
            // place of origin 原产地
            // Certificate of Origin 原产地证书
            quantity: ['1', Validators.required], // 数量,数量=Quantity, Q'ty
            fromWarehouse: ['1', Validators.required], // 发货仓
            toWarehouse: ['1', Validators.required],// 收货仓
            // inTime: ['1', Validators.required],// 入库时间
            outTime: ['1', Validators.required],// 出库时间
            currentPosition: ['1', Validators.required],// 当前位置
            transitList: [[], Validators.required],
            logisticsOrder: ['', Validators.required],// 出库物流信息
            // map: [],
            qualityStatus: [QualityStatus.Inspected],
        });

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.logisticsService.get(params['id']).subscribe(data => {
                this.logisticsForm.setValue({
                    id: data?.id,
                    name: data?.name, //Name of Goods  产品名称/品名
                    code: data?.code,
                    // Model No. /Part number ( P/N), P/N# 件号
                    batchNo: data?.batchNo,// 产品批号
                    // Serial Number, S/N#  序列号
                    specs: data?.specs, // 产品规格 Specifications, Specs
                    countryOFOrigin: data?.countryOFOrigin, // 原产地（国）
                    // place of origin 原产地
                    // Certificate of Origin 原产地证书
                    quantity: data?.quantity, // 数量,数量=Quantity, Q'ty
                    fromWarehouse: data?.fromWarehouse, // 发货仓
                    toWarehouse: data?.toWarehouse, // 收货仓
                    // inTime: data?.inTime,// 入库时间
                    outTime: data?.outTime,// 出库时间
                    currentPosition: data?.currentPosition,// 当前位置
                    transitList: data?.transitList,
                    logisticsOrder: data?.logisticsOrder,// 出库物流信息
                    // map: data?.map,
                    qualityStatus: data?.qualityStatus
                });
            })
        });

    }

}
