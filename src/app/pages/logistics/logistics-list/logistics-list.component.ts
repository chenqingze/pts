import {Component, OnInit} from '@angular/core';
import {QualityStatus, QualityStatusRecord} from "../../product/product.model";
import {Logistics} from "../../logistics/logistics.model";
import {FormBuilder} from "@angular/forms";
import {LogisticsService} from "../../logistics/logistics.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
    selector: 'app-logistics-list',
    templateUrl: './logistics-list.component.html',
    styleUrls: ['./logistics-list.component.css']
})
export class LogisticsListComponent implements OnInit {

    qualityStatusMap = QualityStatusRecord;
    qualityStatus = QualityStatus;
    loading = false;
    /*表格*/
    checked = false;
    indeterminate = false;
    currentPageList: readonly Logistics [] = [];
    logisticsList: Logistics[] = [];
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

    onCurrentPageDataChange($event: readonly Logistics []): void {
        this.currentPageList = $event;
        this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
        const listOfEnabledData = this.currentPageList.filter((item: Logistics) => item.qualityStatus === QualityStatus.NotInspected);
        this.checked = listOfEnabledData.every(item => this.setOfCheckedId.has(item.id));
        this.indeterminate = listOfEnabledData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
    }

    // 提交质检
    qualityInspect() {
        let ids = Array.from(this.setOfCheckedId.values());
        this.logisticsService.qualityInspect(ids).subscribe(data => {

            this.logisticsService.list().subscribe(data => {
                this.logisticsList = data;
                this.logisticsList.forEach(item => this.updateCheckedSet(item.id, false));
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
            nzOnOk: () => this.logisticsService.delete(id).subscribe(() => {
                console.log("删除成功");
                this.logisticsService.list().subscribe(data => this.logisticsList = data);
            }),
            nzCancelText: '否',
            nzOnCancel: () => console.log('Cancel')
        });

    }

    constructor(private fb: FormBuilder, private logisticsService: LogisticsService, private modal: NzModalService) {
    }

    ngOnInit(): void {
        this.logisticsService.list().subscribe(data => this.logisticsList = data);
    }

}
