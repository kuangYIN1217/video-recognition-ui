import { Component } from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
// import {OfflineOptions,ControlAnchor, NavigationControlType} from "angular2-baidu-map";
//import { ControlAnchor, MapOptions, NavigationControlOptions, NavigationControlType, Point } from 'angular2-baidu-map';
// import { MapOptions } from 'angular2-baidu-map';
@Component({
  selector: 'overview-map',
  styleUrls: ['./overview.map.component.css'],
  templateUrl: './overview.map.html',
  providers: [ElectricService],
})

export class OverviewMapComponent {
  appId:string;
  synchronizationShow:boolean = false;
  tip_content:string;
  synchronizeIndex:number;
  info:any[]=[];
  //opts:any;
  //offlineOpts: OfflineOptions;
  opts: any;
  //options: MapOptions;
  constructor(private electricService:ElectricService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.electricService.getSynchronizationInfo(this.appId)
      .subscribe(result=>{
        console.log(result);
        if(result.length==0){
          this.synchronizationShow = false;
        }else{
          this.synchronizationShow = true;
          this.synchronizeIndex = 0;
          this.tip_content = '您已创建电力巡检项目，是否同步其他项目基础信息？';
          this.info = result;
        }
      });

  }
    ngOnInit() {
/*      this.opts = {
        center: {
          longitude: 121.506191,
          latitude: 31.245554
        },
        zoom: 17,
        markers: [{
          longitude: 121.506191,
          latitude: 31.245554,
          title: 'Where',
          content: 'Put description here'
        }]
      };*/
/*      this.options = {
        centerAndZoom: {
          lat: 39.920116,
          lng: 116.403703,
          zoom: 16
        },
        enableKeyboard: true
      };*/
/*      // 配置地图, 参考百度地图api
      this.opts = {
        // 地图中心坐标
        center: {
          longitude: 116.4177150000,
          latitude: 40.0612540000
        },
        zoom: 17,
        // 地图上的坐标
        markers: [{
          longitude: 116.4177150000,
          latitude: 40.0612540000,
          title: '华泰汽车集团',
          content: '朝阳区立水桥',
          autoDisplayInfoWindow: true
        }],
        geolocationCtrl: {
          anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
        },
        scaleCtrl: {
          anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
        },
        overviewCtrl: {
          isOpen: true
        },
        navCtrl: {
          type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
        }
      };

      this.offlineOpts = {
        retryInterval: 5000,
        txt: '没有网络'
      };*/
    }

    // 刚加载加载地图信息
    loadMap(e:any) {
      console.log(e);
    }

    // 单机地图坐标, 打印信息
    clickMarker(marker:any) {
      console.log(marker);
    }

  }
