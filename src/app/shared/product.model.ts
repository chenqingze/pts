export interface Product {
    id: string;// id
    code: string;// 编号
    name: string;//Name of Product  产品名称/品名
    batchNo: string;// 产品批号
    specs: string;// 产品规格 Specifications, Specs
    countryOFOrigin: string;// 原产地（国）
    quantity?: string;// 数量,数量=Quantity, Q'ty
    category?: string; // 产品类别
    manufacturer?: string;// 制造商
    productionDate?: string;// 生产日期
    expirationDate?: string;// 保质期
    storageMethods?: string;// 储存方式
    qualifiedCertificate: string;// 合格证书、质检证书
    qualifiedCertificateNo:string; // 质检证书编码
    qualifiedCertificatePic: string[];
    qualityRating?: string;// 质量等级
    netWeight: string;// 净含量
    tracingNo: string;// 溯源码
    qualityStatus: QualityStatus;// 质检状态:未质检；待质检；已质检
    exchange?: Exchange;// 交易信息
    currentPosition?: string; // 当前位置
    transitList: Transit []; // 物流信息
    logisticsOrder?: string; // 仓储信息
    wareHouseList: WareHouse[]; // 仓储物流
    pictures: string[];// 产品图片
}

export interface WareHouse {
    carrier: string; // 出库物流,承运人
    warehouse: string;// 仓库名称
    position: string;// 仓库位置
    inTime: string;// 入库时间
    outTime: string// 出库时间
    shelf: string// 上架位置
    inspector: string // 质检员
    logisticsOrder: string;//出库物流信息
}

export interface Transit {
    station: string;// 中转站
    outTime: string;// 发出时间
}

export interface Exchange {
    exchangePlatform: string;
    orderNo: string;
    buyer: string;
    shipper: string;
    exchangeTime: string;
    price: string;
    fromWarehouse: string;// 发货仓
    toWarehouse: string; // 收货仓
    outTime: string
}
export enum QualityStatus {
    NotInspected = '未质检',
    ToBeInspected = '待质检',
    Inspected = '已质检'
}

export const QualityStatusRecord: Record<QualityStatus, string> = {
    [QualityStatus.NotInspected]: '未质检',
    [QualityStatus.ToBeInspected]: '待质检',
    [QualityStatus.Inspected]: '已质检'
}
