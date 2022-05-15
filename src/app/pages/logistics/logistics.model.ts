import {QualityStatus} from "../product/product.model";

export interface Logistics {
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
    fromWarehouse: string; // 发货仓
    toWarehouse: string; // 收货仓
    // inTime: string;// 入库时间
    outTime: string;// 出库时间
    currentPosition: string;// 当前位置
    transitList: Transit[];
    logisticsOrder: string// 出库物流信息
    map: [string, string];
    qualityStatus?: QualityStatus
}

export interface Transit {
    station: string; // 中转站
    outTime: string; // 发出时间
}
