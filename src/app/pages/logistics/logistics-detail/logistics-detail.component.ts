import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LogisticsService} from "../logistics.service";
import {Product, QualityStatus} from "../../../shared/product.model";
import * as AMapLoader from '@amap/amap-jsapi-loader';

@Component({
    selector: 'app-logistics-detail',
    templateUrl: './logistics-detail.component.html',
    styleUrls: ['./logistics-detail.component.css']
})
export class LogisticsDetailComponent implements OnInit {
    positionList = [
        {
            time: '2022/2/16 09:21',
            position: 'E123.429096;N41.796765'
        }, {
            time: '2022/2/16 09:22',
            position: 'E123.429096;N41.796765'
        }, {
            time: '2022/2/16 09:23',
            position: 'E123.429096;N41.796765'
        }, {
            time: '2022/2/16 09:24',
            position: 'E123.429096;N41.796764'
        }, {
            time: '2022/2/16 09:25',
            position: 'E123.429096;N41.796763'
        },
    ]
    logisticsForm: FormGroup;
    productList: Product [] = [];
    @ViewChild('mapEl') mapEl!: ElementRef;

    constructor(private fb: FormBuilder, private logisticsService: LogisticsService, private router: Router, private route: ActivatedRoute) {
        this.logisticsForm = this.fb.group({
            id: [''],
            name: ['', Validators.required], //Name of Goods  产品名称/品名
            code: ['', Validators.required], // 编号
            // Model No. /Part number ( P/N), P/N# 件号
            batchNo: ['', Validators.required],// 产品批号
            // Serial Number, S/N#  序列号
            specs: ['', Validators.required], // 产品规格 Specifications, Specs
            countryOFOrigin: ['', Validators.required], // 原产地（国）
            // place of origin 原产地
            // Certificate of Origin 原产地证书
            quantity: ['1', Validators.required], // 数量,数量=Quantity, Q'ty
            fromWarehouse: ['1', Validators.required], // 发货仓
            toWarehouse: ['1', Validators.required],// 收货仓
            // inTime: ['1', Validators.required],// 入库时间
            outTime: ['1', Validators.required],// 出库时间
            currentPosition: ['1', Validators.required],// 当前位置
            transitList: [[], Validators.required],
            logisticsOrder: ['', Validators.required],// 出库物流信息
            // map: [],
            qualityStatus: [QualityStatus.Inspected],
        });

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.logisticsService.get(params['id']).subscribe(data => {
                this.logisticsForm.setValue({
                    id: data?.id,
                    name: data?.name, //Name of Goods  产品名称/品名
                    code: data?.code,
                    // Model No. /Part number ( P/N), P/N# 件号
                    batchNo: data?.batchNo,// 产品批号
                    // Serial Number, S/N#  序列号
                    specs: data?.specs, // 产品规格 Specifications, Specs
                    countryOFOrigin: data?.countryOFOrigin, // 原产地（国）
                    // place of origin 原产地
                    // Certificate of Origin 原产地证书
                    quantity: data?.quantity, // 数量,数量=Quantity, Q'ty
                    fromWarehouse: data?.exchange?.fromWarehouse, // 发货仓
                    toWarehouse: data?.exchange?.toWarehouse, // 收货仓
                    // inTime: data?.inTime,// 入库时间
                    outTime: data?.exchange?.outTime,// 出库时间
                    currentPosition: data?.currentPosition,// 当前位置
                    transitList: data?.transitList,
                    logisticsOrder: data?.logisticsOrder,// 出库物流信息
                    // map: data?.map,
                    qualityStatus: data?.qualityStatus
                });
            })
        });
        this.initMap();
    }


    initMap() {
        AMapLoader.load({
            "key": "a5d7cb14f231eeaf3f0f99bd6963df7b",              // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": ['AMap.Driving'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            "AMapUI": {             // 是否加载 AMapUI，缺省不加载
                "version": '1.1',   // AMapUI 版本
                "plugins": ['overlay/SimpleMarker'],       // 需要加载的 AMapUI ui插件
            },
            "Loca": {                // 是否加载 Loca， 缺省不加载
                "version": '2.0'  // Loca 版本
            },
        }).then((AMap) => {
            let map = new AMap.Map(this.mapEl.nativeElement, {
                features: ['bg', 'point', 'road'],
                isHotspot: false,
                center: [116.397559, 39.89621],
                mapStyle: 'amap://styles/macaron',
                zoom: 5
            });
            // modalMap.on("complete", function () {
            //
            // });
            let drivingOption = {
                policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
                ferry: 1, // 是否可以使用轮渡
                province: '京', // 车牌省份的汉字缩写
            }

            // 构造路线导航类
            let driving = new AMap.Driving(drivingOption);

            // 根据起终点经纬度规划驾车导航路线
            driving.search(new AMap.LngLat(113.851006,23.292775), new AMap.LngLat(117.235421,31.906654), function (status: any, result: any) {
                // result即是对应的驾车
                // 导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === 'complete') {
                    if (result.routes && result.routes.length) {
                        // 绘制第一条路线，也可以按需求绘制其它几条路线
                        drawRoute(result.routes[0])
                        console.log('绘制驾车路线完成', result);
                    }
                } else {
                    console.error('获取驾车数据失败：' + result);
                }
            });

            let drawRoute = (route: any) => {
                let path = parseRouteToPath(route)

                let startMarker = new AMap.Marker({
                    position: path[0],
                    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                    map: map,
                    anchor: 'bottom-center'
                });
                let middleMarker = new AMap.Marker({
                    position: path[path.length - 1],
                    map: map,
                    anchor: 'bottom-center'
                });

                let endMarker = new AMap.Marker({
                    position: [117.069141,36.705944],
                    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                    map: map,
                    anchor: 'bottom-center'
                })

                let routeLine = new AMap.Polyline({
                    path: path,
                    isOutline: true,
                    outlineColor: '#ffeeee',
                    borderWeight: 1,
                    strokeWeight: 2,
                    strokeOpacity: 0.9,
                    strokeColor: '#0091ff',
                    lineJoin: 'round',
                    showDir: true
                })

                // let scale = new AMap.Scale();
                // let toolBar = new AMap.ToolBar({
                //     position: {
                //         top: '110px',
                //         right: '40px'
                //     }
                // });
                // let controlBar = new AMap.ControlBar({
                //     position: {
                //         top: '10px',
                //         right: '10px',
                //     }
                // });
                // map.addControl(scale);
                // map.addControl(toolBar);
                // map.addControl(controlBar);
                map.add(routeLine);

                // 调整视野达到最佳显示区域
                map.setFitView([startMarker, middleMarker, endMarker, routeLine])
            }

            // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
            // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
            let parseRouteToPath = (route: any) => {
                let path = []

                for (let i = 0, l = route.steps.length; i < l; i++) {
                    let step = route.steps[i]

                    for (let j = 0, n = step.path.length; j < n; j++) {
                        path.push(step.path[j])
                    }
                }

                return path
            }

        }).catch((e) => {
            console.error(e);  //加载错误提示
        });
    }

}
