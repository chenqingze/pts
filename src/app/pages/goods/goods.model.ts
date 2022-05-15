import {QualityStatus} from "../product/product.model";

export interface Goods {
    id: string; // id
    name: string; //Name of Product  产品名称/品名
    code: string; // 编号
    // Model No. /Part number ( P/N), P/N# 件号
    batchNo: string;// 产品批号
    // Serial Number, S/N#  序列号
    specs: string; // 产品规格 Specifications, Specs
    countryOFOrigin: string; // 原产地（国）
    // place of origin 原产地
    // Certificate of Origin 原产地证书
    quantity: string; // 数量,数量=Quantity, Q'ty
    qualityStatus: QualityStatus; // 质检状态:未质检；待质检；已质检
    transferList: Logistics[];// 仓储物流
}

export interface Logistics {
    warehouse: string;// 仓库名称
    position: string;// 仓库位置
    inTime: string;// 入库时间
    outTime: string// 出库时间
    shelf: string// 上架位置
    inspector: string // 质检员
    logisticsOrder: string// 出库物流,承运人

}
