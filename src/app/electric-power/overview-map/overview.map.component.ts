import {Component, ViewChild} from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
import {IIcon, ILabel, IPixel} from "ngx-amap/types/interface";
import {Router} from "@angular/router";
import {calc_height} from "../../common/ts/calc_height";
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
  deleteIndex:number=0;
  tip_title:string='提示';
  tip_content1:string='暂无杆塔信息';
  tip_btn:string='map';
  //infoWindowOffset:IPixel;
  @ViewChild("map") map:any;
  //@ViewChild(NgxAmapComponent) map:NgxAmapComponent;
  constructor(private electricService:ElectricService,private router: Router) {
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
  deleteChange(event){
    this.deleteIndex = event;
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
      .subscribe(
        (result)=>{
          //console.log(result);
          this.setMap(result);
      },
        (err)=>{
          //console.log(err.text());
          this.deleteIndex = 1;
        })
  }
  output(item){
    console.log(item);
  }
  getTitle(item){
    if(item.towerInfo.status=='检测异常'){
      return `${item.towerInfo.status}：${item.flawCount}，请点击查看`;
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
    console.log(event.target.Xg.title.substring(0,4));
    if(event.target.Xg.title.substring(0,4)=='检测异常'){
      this.router.navigate(['/taskresult'],{queryParams: {'allInfo':JSON.stringify(event.target.Xg.extData),}});
    }else{
      return false
    }
  }
  onMarkerReady(map: any) {
    map.setFitView();
  }
  onReady(map: any){
    //map.setCenter(Number(this.allInfo.longitude),Number(this.allInfo.latitude));
  }
  outRate(item){
    return Number(item).toFixed(2);
  }
  setMap(result){
    if(result) {
      this.allInfo = result;
      this.flawArr = this.allInfo.towerList;
    }
    this.markers = [];
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
        extData:this.flawArr[i].taskInfo
      };
      this.markers.push(this.marker);
    }
  }

  ngOnInit() {
    calc_height(document.getElementById('map'));
    let dom = document.querySelector('.demo-map');
    let height = $("#map").height();
    $(dom).css({
      'height': (height-79) + 'px',
      'display':'block',
    })
    this.electricService.searchMapInfo(this.appId,0,0)
      .subscribe(result=>{
          this.setMap(result);
      })
  }
}
