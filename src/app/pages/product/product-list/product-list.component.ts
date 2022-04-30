import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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
    {
      text: '未质检',
      onSelect: () => {
        this.currentPageList.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: '待质检',
      onSelect: () => {
        this.currentPageList.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: '已质检',
      onSelect: () => {
        this.currentPageList.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];

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
    this.checked = this.currentPageList.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.currentPageList.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  // 提交质检
  qualityDetection() {

  }

  /*查询*/
  searchForm!: FormGroup;
  isCollapse = true;

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

  constructor(private fb: FormBuilder, private productService: ProductService) {
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


  delete(id: string) {
    this.productService.delete(id).subscribe(() => {
      console.log("删除成功");
      this.productService.list().subscribe(data => this.productList = data);
    });
  }
}
