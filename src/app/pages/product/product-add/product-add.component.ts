import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {getBase64} from "../../../shared/utils";
import {HttpApi} from "../../../core/http/http-api";
import {QualityStatus} from "../../../shared/product.model";
import {concatMap, of, takeUntil, timer} from "rxjs";


@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
    uploadAction = HttpApi.uploads;
    productForm: FormGroup;
    previewImage: string | undefined = '';
    previewVisible = false;
    pictureList: NzUploadFile[] = [];
    @ViewChild('progress1') progress1!: TemplateRef<any>;
    @ViewChild('progress2') progress2!: TemplateRef<any>;
    @ViewChild('progress3') progress3!: TemplateRef<any>;
    @ViewChild('progress4') progress4!: TemplateRef<any>;
    percent1 = 1
    percent2 = 1
    percent3 = 1
    percent4 = 1

    handlePreview = async (file: NzUploadFile): Promise<void> => {
        if (!file.url && !file['preview']) {
            file['preview'] = await getBase64(file.originFileObj!);
        }
        this.previewImage = file.url || file['preview'];
        this.previewVisible = true;
    };

    handleQualifiedCertificateChange(info: NzUploadChangeParam) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(info.file, info.fileList);
            this.productForm.controls['qualifiedCertificate'].setValue(info.file.response.filename);
            this.msg.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            this.msg.error(`${info.file.name} file upload failed.`);
        }
    }

    handleTracingNoChange(info: NzUploadChangeParam) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            this.productForm.controls['tracingNo'].setValue(info.file.response.filename);
            console.log(this.productForm.controls['tracingNo'])
            console.log(this.productForm)
            this.msg.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            this.msg.error(`${info.file.name} file upload failed.`);
        }
    }

    handlePicturesChange(info: NzUploadChangeParam): void {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            this.msg.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            this.msg.error(`${info.file.name} file upload failed.`);
        }
        console.log(this.productForm);
    }


    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.productForm.reset();
    }

    submitForm(): void {
        if (this.productForm.valid) {
            let pics = this.pictureList.map(pic => pic.response.filename);
            this.productForm.controls['pictures'].setValue(pics);
            console.log('submit', this.productForm.getRawValue());
            this.startShowMessages();
            /*this.productService.create(this.productForm.getRawValue()).subscribe(() => {
                console.log("创建成功");
                // todo: 增加弹窗显示上链信息
                this.router.navigate(['/product'])
            });*/
        }
    }

    startShowMessages(): void {
        this.msg
            .loading('连接溯源链Certificate Authority服务器认证数据访问权限...', {nzDuration: 1000})
            .onClose!
            .pipe(
                concatMap(() => {
                    this.msg.loading(this.progress1, {nzDuration: 10000}).onClose!;
                    timer(0, 1000).pipe(takeUntil(timer(10000))).subscribe(() => this.percent1 = this.increase(this.percent1))
                    return of(true);
                }),
                concatMap(() => {
                    this.msg.loading(this.progress2, {nzDuration: 10000}).onClose!;
                    timer(1000, 1000).pipe(takeUntil(timer(10000))).subscribe(() => this.percent2 = this.increase(this.percent2))
                    return of(true);
                }),
                concatMap(() => {
                    this.msg.loading(this.progress3, {nzDuration: 10000}).onClose!;
                    timer(2000, 1000).pipe(takeUntil(timer(10000))).subscribe(() => this.percent3 = this.increase(this.percent3))
                    return timer(8000);
                }),
                concatMap(() => {
                    // this.msg.loading(this.progress4, {nzDuration: 12000}).onClose!;
                    // timer(3000,10000).pipe(takeUntil(timer(10000))).subscribe(() => this.percent4 = this.increase(this.percent4))
                    return this.msg.success('上链成功！', {nzDuration: 3000}).onClose!;

                })
            ).subscribe(() => {
            this.router.navigate(['/product'])
            console.log('All completed!');
        });
    }

    increase(percent: any): number {
        let percentTmp = percent + 40;
        if (percentTmp > 100) {
            percentTmp = 100;
        }
        return percentTmp;
    }

    constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private msg: NzMessageService) {
        this.productForm = this.fb.group({
            // id: [null],
            name: ['增城丝苗米', Validators.required], //Name of Product  产品名称/品名
            // Model No. /Part number ( P/N), P/N# 件号
            batchNo: ['2022050766588', Validators.required],// 产品批号
            // Serial Number, S/N#  序列号
            specs: ['25Kg/袋', Validators.required], // 产品规格 Specifications, Specs
            countryOFOrigin: ['广州增城市', Validators.required], // 原产地（国）
            // place of origin 原产地
            // Certificate of Origin 原产地证书
            quantity: ['500袋', Validators.required], // 数量,数量=Quantity, Q'ty
            category: ['籼米', Validators.required], // 产品类型
            // importer: ['', Validators.required], // 进口商
            // importerAddress: ['', Validators.required], // 进口商地址
            // placeOfClearance: ['', Validators.required], // 报关口岸
            manufacturer: ['广州金凤凰米业', Validators.required], // 制造商
            // material: ['', Validators.required], // 原材料
            productionDate: ['2022-05-07', Validators.required], // 生产日期
            expirationDate: ['12个月', Validators.required], // 保质期
            storageMethods: ['阴凉通风，干燥存储', Validators.required], // 储存方式
            pictures: [this.pictureList], // 产品图片
            // certificateOfOriginNo: ['', Validators.required], // 原产地证书编号、进口证书编号
            // certificateOfOrigin: ['', Validators.required], // 原产地证书、进口证书
            // qualifiedCertificateNo: ['', Validators.required], // 合格证书编号、质检证书编号
            qualifiedCertificate: [''], // 合格证书、质检证书
            qualityRating: ['一级', Validators.required],// 质量等级
            netWeight: ['25kg', Validators.required], // 净含量
            // tracingNo: [''], // 溯源码
            // hashCode: ['', Validators.required] // 哈希值
            qualityStatus: [QualityStatus.NotInspected]
        });
    }

    ngOnInit(): void {
    }


}
