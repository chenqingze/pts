import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GoodsService} from "../goods.service";
import {QualityStatus} from "../../product/product.model";
import {Logistics} from "../goods.model";

@Component({
    selector: 'app-goods-detail',
    templateUrl: './goods-detail.component.html',
    styleUrls: ['./goods-detail.component.css']
})
export class GoodsDetailComponent implements OnInit {

    goodsForm: FormGroup;
    transferList: Logistics[] = [];

    constructor(private fb: FormBuilder, private goodsService: GoodsService, private router: Router, private route: ActivatedRoute) {
        this.goodsForm = this.fb.group({
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
            qualityStatus: [QualityStatus.Inspected, Validators.required],
            transferList: [[], Validators.required]
        });

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.goodsService.get(params['id']).subscribe(data => {
                this.goodsForm.setValue({
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
                    qualityStatus: data?.qualityStatus, // 质检状态:未质检；待质检；已质检
                    transferList: data?.transferList// 仓储物流
                });
                this.transferList = data?.transferList || [];
            })
        });

    }
}
