// 仓单
export interface DeliveryNote {
    id: string;
    createAt: string; // 生成时间
    deliveryStatus: string; // 仓单状态：正常
    code: string; // 仓单编号：
    wareHouse?: string; // 保管 仓储
    wareHouseAddrs?: string; // 仓储地址
    carrier?: string; // 运输物流
    currentPosition?: string; // 当前位置
    productName: string; // 产品名称
    lossCriteria: string; // 损耗标准
    storagePeriod: string; // 仓储期限
    deliveryPeriod: string; // 运输期限
    insurance: string; // 保险
    manufacturer?: string;// 制造商
    quantity: string; // 数量
    contract: string; // 仓储合同
    storageCharge: string; // 仓储费
    placeOfOrigin: string; // 产地
    qualityRating: string; // 质量等级
    // changAnReceiptCertificate: string; // 长安联盟链仓单存证
    hashcode: string; // 长安联盟链仓单存证:交易返回哈希值
    tracingList: { step: string, dateTime: string }[] // 溯源信息
    owner: Owner;
    financialInfo?: FinancialInfo;
}

// 所有人
export interface Owner {
    companyName: string; // 经营者名称
    uscc: string;  // 统一社会信用代码 Uniform social credit code
    businessTerm: string;// 营业期限
    companyType: string; // 企业类型
    location: string; // 注册地址
    generalItem: string;// 经营范围
    registeredCapital: string;// 注册资本
    establishmentDate: string; // 成立日期
}

export interface FinancialInfo {
    companyName: string; // 保险公司名称
    addrs: string; // 地址
    tel: string; // 电话
    code: string; // 保单编号
    amount:string // 保价金额
    status:string // 仓单质押状态
    bankName: string; // 银行名称
    bankAddrs: string; // 地址
    bankTel: string; // 电话
    contractCode: string; // 合同编号
    zhiYaAmount: string; // 质押金额
}


