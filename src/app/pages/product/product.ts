export interface Product {
  id: string; // id
  name: string; //Name of Product  产品名称/品名
  // Model No. /Part number ( P/N), P/N# 件号
  batchNo: string;// 产品批号
  // Serial Number, S/N#  序列号
  specs: string; // 产品规格 Specifications, Specs
  countryOFOrigin: string; // 原产地（国）
  // place of origin 原产地
  // Certificate of Origin 原产地证书
  quantity: string; // 数量,数量=Quantity, Q'ty

  importer: string; // 进口商
  importerAddress: string; // 进口商地址
  placeOfClearance: string; // 报关口岸
  // Material Number, Mat'l# // 料号
  manufacturer: string; // 制造商
  material: string; // 原材料
  expirationDate: string; // 保质期
  description: string; // 产品描述
  pictures: string[]; // 产品图片
  certificateOfOriginNo: string; // 原产地证书编号、进口证书编号
  certificateOfOrigin: string; // 原产地证书、进口证书
  qualifiedCertificateNo: string; // 合格证书编号、质检证书编号
  qualifiedCertificate: string; // 合格证书、质检证书
  tracingNo: string; // 溯源码
  hashCode: string; // 哈希值
  // qualityStatus: string; // 质检状态:未质检；待质检；已质检
}
