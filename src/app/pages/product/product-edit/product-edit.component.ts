import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {getBase64} from "../../../shared/utils";
import {NzMessageService} from "ng-zorro-antd/message";
import {HttpApi} from "../../../core/http/http-api";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
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

  submitForm(): void {
    if (this.productForm.valid) {
      let pics = this.pictureList.map(pic => pic.response.filename);
      this.productForm.controls['pictures'].setValue(pics);
      console.log('submit', this.productForm.getRawValue());
      this.productService.update(this.productForm.getRawValue()).subscribe(() => {
        console.log("保存成功");
        this.router.navigate(['/product/list']);
      });
    } else {

    }
  }

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute, private msg: NzMessageService) {
    this.productForm = this.fb.group({
      id: [''],
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
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.get(params['id']).subscribe(data => {
        this.productForm.setValue({
          id: data?.id,
          name: data?.name, //Name of Product  产品名称/品名
          // Model No. /Part number ( P/N), P/N# 件号
          batchNo: data?.batchNo,// 产品批号
          // Serial Number, S/N#  序列号
          specs: data?.specs, // 产品规格 Specifications, Specs
          countryOFOrigin: data?.countryOFOrigin, // 原产地（国）
          // place of origin 原产地
          // Certificate of Origin 原产地证书
          quantity: data?.quantity, // 数量,数量=Quantity, Q'ty
          importer: data?.importer, // 进口商
          importerAddress: data?.importerAddress, // 进口商地址
          placeOfClearance: data?.placeOfClearance, // 报关口岸
          manufacturer: data?.manufacturer, // 制造商
          material: data?.material, // 原材料
          expirationDate: data?.expirationDate, // 保质期
          description: data?.description, // 产品描述
          pictures: data?.pictures, // 产品图片
          // certificateOfOriginNo: ['', Validators.required], // 原产地证书编号、进口证书编号
          // certificateOfOrigin: ['', Validators.required], // 原产地证书、进口证书
          // qualifiedCertificateNo: ['', Validators.required], // 合格证书编号、质检证书编号
          // qualifiedCertificate: ['', Validators.required], // 合格证书、质检证书
          // tracingNo: ['', Validators.required], // 溯源码
          // hashCode: ['', Validators.required] // 哈希值
        })
        this.pictureList = data.pictures.map((pic, index) => {
          return {
            uid: `${index}`,
            name: pic,
            filename: pic,
            url: `${HttpApi.uploads}/${pic}`
          } as NzUploadFile;
        })
      })
    });

  }

}
