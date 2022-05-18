import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {Product, QualityStatus, QualityStatusRecord} from "../../../shared/product.model";
import {GoodsService} from "../goods.service";

@Component({
    selector: 'app-goods-list',
    templateUrl: './goods-list.component.html',
    styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {

    qualityStatusMap = QualityStatusRecord;
    qualityStatus = QualityStatus;
    loading = false;
    /*表格*/
    checked = false;
    indeterminate = false;
    currentPageList: readonly Product [] = [];
    goodsList: Product[] = [];
    setOfCheckedId = new Set<string>();

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

    /*
    onAllChecked(value: boolean): void {
        this.currentPageList.forEach(item => this.updateCheckedSet(item.id, value));
        this.refreshCheckedStatus();
    }
    */

    onAllChecked(value: boolean): void {
        this.currentPageList.filter(item => item.qualityStatus == QualityStatus.NotInspected).forEach((data, index) => this.updateCheckedSet(data.id, value));
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
        this.goodsService.qualityInspect(ids).subscribe(data => {

            this.goodsService.list().subscribe(data => {
                this.goodsList = data;
                this.goodsList.forEach(item => this.updateCheckedSet(item.id, false));
                this.refreshCheckedStatus();
            });
        });
    }

    delete(id: string) {
        this.modal.confirm({
            nzTitle: '您确定要删除此产品吗?',
            nzContent: '请谨慎操作！',
            nzOkText: '是',
            nzOkType: 'primary',
            nzOkDanger: true,
            nzOnOk: () => this.goodsService.delete(id).subscribe(() => {
                console.log("删除成功");
                this.goodsService.list().subscribe(data => this.goodsList = data);
            }),
            nzCancelText: '否',
            nzOnCancel: () => console.log('Cancel')
        });

    }

    constructor(private fb: FormBuilder, private goodsService: GoodsService, private modal: NzModalService) {
    }

    ngOnInit(): void {
        this.goodsService.list().subscribe(data => this.goodsList = data);
    }
}
