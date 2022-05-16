import {QualityStatus} from "../product/product.model";
import {Transit} from "../logistics/logistics.model";

export interface Exchange {
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
    toWarehouse: string; // 收货仓/交割仓储
    // inTime: string;// 入库时间
    // outTime: string;// 出库时间
    // currentPosition: string;// 当前位置
    // transitList: Transit[];
    // logisticsOrder: string// 出库物流信息
    // map: [string, string];
    exchangePlatform: string; // 交易平台
    orderNo: string; // 交易单号/电子单号
    buyer: string; // 买方
    shipper: string; // 卖方
    exchangeTime: string;// 交易时间
    price:string; // 交易单价
    // qualityStatus?: QualityStatus
}
