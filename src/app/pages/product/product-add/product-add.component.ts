import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {getBase64} from "../../../shared/utils";
import {HttpApi} from "../../../core/http/http-api";
import {QualityStatus} from "../product.model";


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

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };


  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
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
      this.productService.create(this.productForm.getRawValue()).subscribe(() => {
        console.log("创建成功");
        this.router.navigate(['/product'])
      });
    } else {

    }
  }


  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private msg: NzMessageService) {
    this.productForm = this.fb.group({
      // id: [null],
      name: ['', Validators.required], //Name of Product  产品名称/品名
      // Model No. /Part number ( P/N), P/N# 件号
      batchNo: ['', Validators.required],// 产品批号
      // Serial Number, S/N#  序列号
      specs: ['', Validators.required], // 产品规格 Specifications, Specs
      countryOFOrigin: ['', Validators.required], // 原产地（国）
      // place of origin 原产地
      // Certificate of Origin 原产地证书
      quantity: ['1', Validators.required], // 数量,数量=Quantity, Q'ty
      importer: ['', Validators.required], // 进口商
      importerAddress: ['', Validators.required], // 进口商地址
      placeOfClearance: ['', Validators.required], // 报关口岸
      manufacturer: ['', Validators.required], // 制造商
      material: ['', Validators.required], // 原材料
      expirationDate: ['', Validators.required], // 保质期
      description: ['', Validators.required], // 产品描述
      pictures: [this.pictureList], // 产品图片
      // certificateOfOriginNo: ['', Validators.required], // 原产地证书编号、进口证书编号
      // certificateOfOrigin: ['', Validators.required], // 原产地证书、进口证书
      // qualifiedCertificateNo: ['', Validators.required], // 合格证书编号、质检证书编号
      // qualifiedCertificate: ['', Validators.required], // 合格证书、质检证书
      // tracingNo: ['', Validators.required], // 溯源码
      // hashCode: ['', Validators.required] // 哈希值
      qualityStatus: [QualityStatus.NotInspected]
    });
  }

  ngOnInit(): void {
  }


}
