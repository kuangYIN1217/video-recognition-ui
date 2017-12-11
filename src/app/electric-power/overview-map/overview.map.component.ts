import {Component} from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
import {IIcon, ILabel, IPixel} from "ngx-amap/types/interface";
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
  icon: IIcon;
  label: ILabel;
  markers:any[]=[];
  allInfo:any={};
  flawArr:any[]=[];
  infoWindowOffset:IPixel;
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
    this.electricService.searchMapInfo(this.appId,0,0)
      .subscribe(result=>{
        if(result){
          console.log(result);
          this.allInfo = result;
          console.log(this.allInfo.towerList);
          this.flawArr = this.allInfo.towerList;
          console.log(this.flawArr);
        }
      })
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
  onMarkerEvent(event){
    console.log(event);
    if(event.type=="mouseover"){
/*      label : {
        offset: {
          x: 55,
            y: 50
        },
        content: '苏宁'
      }*/
    }else if(event.type=="mouseout"){
      this.label = null;
    }

  }
  output(item){
    console.log(item);
  }
  ngOnInit(){
/*    this.icon = this.icon ? null : {
      size: {
        width: 46,
        height: 46
      },
      image: 'assets/electric/detect.png',
    };*/
    this.infoWindowOffset = {
      x: 0,
      y: -30
    };
    this.markers=[
      {
        point: {
          lat: 32.08637,
          lng: 118.88831
        },
        icon :{
          size: {
            width: 46,
            height: 46
          },
          image: 'assets/electric/detect.png'
        },
        label : {
          offset: {
            x: 55,
            y: 50
          },
        content: '<div style="border:none;font-size:18px; color: red; font-weight: bold;background: transparent;">12</div>'
        }
      },
      {
        point: {
          lat: 32.087696,
          lng: 118.892735
        },
        icon :{
          size: {
            width: 46,
            height: 46
          },
          image: 'assets/electric/undetect.png'
        },
        label : {
          offset: {
            x: 55,
            y: 50
          },
          content: `&nbsp;&nbsp;苏宁&nbsp;&nbsp;${30}&nbsp;&nbsp;`
        }
      }
    ]
  }
}
