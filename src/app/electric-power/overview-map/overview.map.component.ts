import {Component, ViewChild} from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
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
  lineName:string='';
  taskName:string='';
  lineArr:any[]=[];
  taskArr:any[]=[];
  lineId:number;
  taskId:number;
  /*public opts: MapOptions;*/
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
    this.electricService.getMapTask(this.appId)
      .subscribe(result=>{
        console.log(result);
        this.taskArr = result;
        //this.taskName = result
      })
    this.electricService.getMapLine(this.appId)
      .subscribe(result=>{
        console.log(result);
        this.lineArr = result;
        this.lineName = this.lineArr[0].lineName;
      })
  }
  search(){
    for(let i=0;i<this.lineArr.length;i++){
      if(this.lineName==this.lineArr[i].lineName){
          this.lineId = this.lineArr[i].lineId;
      }
    }
    for(let i=0;i<this.taskArr.length;i++){
      if(this.taskName==this.taskArr[i].taskName){
        this.taskId = this.taskArr[i].taskId;
      }
    }
    this.electricService.searchMapInfo(this.appId,this.lineId,this.taskId)
      .subscribe(result=>{
        console.log(result);
      })
  }
  ngOnInit(){
/*    this.opts = {
      centerAndZoom: {
        lng: 121.506191,
        lat: 31.245554,
        zoom: 15
      }
    };*/
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
