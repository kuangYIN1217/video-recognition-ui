import { Component } from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
//import {ControlAnchor, MapOptions, MarkerOptions, NavigationControlOptions, NavigationControlType, Point} from 'angular2-baidu-map';
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
  /*options: MapOptions;
  point: Point;
  navOptions: NavigationControlOptions;
  markers: Array<{ point: Point; options?: MarkerOptions }>*/
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
    this.electricService.getTaskByAppId(this.appId)
      .subscribe(result=>{
        console.log(result);
      })
  }
/*    ngOnInit() {
      this.options = {
        centerAndZoom: {
          lat: 32.093016,
          lng: 118.893665,
          zoom: 16
        },
        enableScrollWheelZoom:true
      };
/!*      this.point = {
        lat: 32.093016,
        lng: 118.893665
      };*!/
      this.markers = [
        {
          options: {
            icon: {
              imageUrl: '/assets/electric/detect.png',
              size: {
                height: 46,
                width: 46
              }
            }
          },
          point: {
            lat: 32.093016,
            lng: 118.893665,
          }
        },
        {
          point: {
            lat: 32.093010,
            lng: 118.893660,
          }
        }
      ]
    }*/
  }
