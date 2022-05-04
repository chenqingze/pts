import {Component, OnInit} from '@angular/core';
import {Product, QualityStatus, QualityStatusRecord} from "../product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  qualityStatusMap = QualityStatusRecord;
  qualityStatus = QualityStatus;
  loading = false;
  /*表格*/
  checked = false;
  indeterminate = false;
  currentPageList: readonly Product [] = [];
  productList: Product[] = [];
  setOfCheckedId = new Set<string>();
  // 快速选择
  selectionList = [
    {
      text: '全部',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    /*
     {
      text: '未质检',
      onSelect: () => {
        this.currentPageList.forEach((data, index) => this.updateCheckedSet(data.id, data.qualityStatus == QualityStatus.NotInspected));
        this.refreshCheckedStatus();
      }
    },
    {
      text: '待质检',
      onSelect: () => {
        this.currentPageList.forEach((data, index) => this.updateCheckedSet(data.id, data.qualityStatus == QualityStatus.ToBeInspected));
        this.refreshCheckedStatus();
      }
    },
    {
      text: '已质检',
      onSelect: () => {
        this.currentPageList.forEach((data, index) => this.updateCheckedSet(data.id, data.qualityStatus == QualityStatus.Inspected));
        this.refreshCheckedStatus();
      }
    }*/
  ];

  /*for 查询*/
  searchForm!: FormGroup;
  isCollapse = true;

  updateCheckedSet(id: string, checked: boolean): void {

    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.currentPageList.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Product []): void {
    this.currentPageList = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.currentPageList.filter((item: Product) => item.qualityStatus === QualityStatus.NotInspected);
    this.checked = listOfEnabledData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = listOfEnabledData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  // 提交质检
  qualityInspect() {
    let ids = Array.from(this.setOfCheckedId.values());
    this.productService.qualityInspect(ids).subscribe(data => {

      this.productService.list().subscribe(data => {
        this.productList = data;
        this.productList.forEach(item => this.updateCheckedSet(item.id, false));
        this.refreshCheckedStatus();
      });
    });
  }


  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  submitForm(): void {
    if (this.searchForm.valid) {
      console.log('submit', this.searchForm.value);
    } else {

    }
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  delete(id: string) {
    this.modal.confirm({
      nzTitle: '您确定要删除此产品吗?',
      nzContent: '请谨慎操作！',
      nzOkText: '是',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.productService.delete(id).subscribe(() => {
        console.log("删除成功");
        this.productService.list().subscribe(data => this.productList = data);
      }),
      nzCancelText: '否',
      nzOnCancel: () => console.log('Cancel')
    });

  }

  constructor(private fb: FormBuilder, private productService: ProductService, private modal: NzModalService) {
  }

  ngOnInit(): void {
    this.productService.list().subscribe(data => this.productList = data);
    this.searchForm = this.fb.group({
      name: [],
      batchNum: [],
      productionDate: [],
      qualityStatus: []
    });

  }


}
