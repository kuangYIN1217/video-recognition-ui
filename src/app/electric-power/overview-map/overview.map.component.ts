import {Component, Input} from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
import {IIcon, ILabel, IPixel} from "ngx-amap/types/interface";
import {LngLat} from 'ngx-amap/types/class';
declare var $:any;
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
  label: ILabel;
  markers:any[]=[];
  marker:any={};
  allInfo:any={};
  flawArr:any[]=[];
  infoWindowOffset:IPixel;
  center:any={};
  @Input() set setLabel(label:any){
    console.log(label);
  }
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

    this.electricService.getMapTask(this.appId)
      .subscribe(result=>{
        console.log(result);
        this.taskArr = result;
        let obj:any={};
        obj.taskName = "全部";
        obj.taskId = 0;
        this.taskArr.unshift(obj);
        this.taskName = this.taskArr[0].taskName;
      })
    this.electricService.getMapLine(this.appId)
      .subscribe(result=>{
        console.log(result);
        this.lineArr = result;
        let obj:any={};
        obj.lineName = "全部";
        obj.lineId = 0;
        this.lineArr.unshift(obj);
        this.lineName = this.lineArr[0].lineName;
      })
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
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
  output(item){
    console.log(item);
  }
  getTitle(item){
    if(item.towerInfo.status=='未检测'){
      return `${item.towerInfo.status}:${item.flawCount}`;
    }else{
      return item.towerInfo.status;
    }
  }
  getImage(item){
    if(item=='未检测'){
      return 'assets/electric/undetect.png';
    }else if(item=='检测正常'){
      return 'assets/electric/detect.png';
    }else if(item=='检测异常'){
      return 'assets/electric/detecterror.png';
    }
  }
  onMarkerEvent(event: any, type: string) {
    console.log('marker event:', type, event);
    console.log(event.target.Xg);
  }

  ngOnInit() {
    this.electricService.searchMapInfo(this.appId,0,0)
      .subscribe(result=>{
        if(result) {
          console.log(result);
          this.allInfo = result;
          //console.log(this.allInfo);
          this.flawArr = this.allInfo.towerList;
          //console.log(this.flawArr);
        }

    this.markers = [];
    this.infoWindowOffset = {
      x: 14,
      y: -30
    };
    this.center = {
        lat:this.allInfo.latitude,
        lng:this.allInfo.longitude
        };
    console.log(this.center);
    for (let i = 0; i < this.flawArr.length; i++) {
      this.marker = {
        point: {
           lat: this.flawArr[i].towerInfo.towerLatitude,
           lng: this.flawArr[i].towerInfo.towerLongitude
        },
        icon: {
          size: {
            width: 46,
            height: 46
          },
         image: this.getImage(this.flawArr[i].towerInfo.status)
        },
        label: {
          offset: {
            x: 8,
            y: 50
          },
          content: `<div style="font-size:18px; color: red; font-weight: bold;">${this.flawArr[i].towerInfo.towerNum}</div>`
        },
        title:this.getTitle(this.flawArr[i]),
        extData:this.flawArr[i].towerInfo.towerId
      };
      this.markers.push(this.marker);
    }
      console.log(this.markers);
      })
  }
}
