import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {ElectricService} from "../../common/services/electric.service";
import {Page} from "app/common/defs/resources";
import {SERVER_URL} from "../../app.constants";
import { FileUploader} from "ng2-file-upload";
@Component({
  selector: 'data-manage',
  styleUrls: ['./data.manage.component.css'],
  templateUrl: './data.manage.html',
  providers: [ElectricService]
})

export class DataManageComponent {
  appId:string;
  unitName:string;
  unitNameArr:any[]=[];
  lineName:string;
  lineNameArr:any[]=[];
  towerNo:string;
  towerNoArr:any[]=[];
  page: number = 0;
  pageMaxItem: number = 10;
  pageParams = new Page();
  dataInfo:any[]=[];
  all_selected:boolean = false;
  unitId:number;
  lineId:number;
  towerId:number;
  deleteShow:boolean=false;
  delete_towerIds:string;
  tip_content:string;
  filePath:any[]=[];
  constructor(private router:Router,private route:ActivatedRoute,private electricService:ElectricService){
    this.appId = window.sessionStorage.getItem("applicationId");
    this.getDateInfo(this.appId,0,0,0,this.page,this.pageMaxItem);
    this.electricService.getAllUnit(this.appId)
      .subscribe(result=>{
        this.unitNameArr = result;
        let obj:any={};
        obj.unitName = '全部';
        obj.unitId = 0;
        this.unitNameArr.unshift(obj);
        this.unitName = this.unitNameArr[0].unitName;
        this.getInit();
      })
  }
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/uploadPatrolInfoFile",
    method: "POST",
    itemAlias: "file",
  });
  selectedFileOnChanged(event){
    console.log(this.uploader.queue);
    this.uploader.uploadAll(); // 开始上传
    this.filePath=[];
    for(let i=0;i<this.uploader.queue.length;i++){
      this.uploader.queue[i].onSuccess = (response: any, status: any, headers: any) => {
          this.filePath.push(response);
          if(i==this.uploader.queue.length-1){
            let path = this.filePath.join(',');
              this.electricService.saveExcel(this.appId,path)
                .subscribe(result=>{
                  console.log(result);
                  this.uploader.queue=[];
                })
          }
      }
    }
  }
  download(){
    window.open(SERVER_URL+"/download/patrolModel.xlsx ");
  }
  getInit(){
    this.lineNameArr=[];
    let obj1:any={};
    obj1.lineName = '全部';
    obj1.lineId = 0;
    this.lineNameArr.unshift(obj1);
    this.lineName = this.lineNameArr[0].lineName;
    this.towerNoArr=[];
    let obj2:any={};
    obj2.towerNum = '全部';
    obj2.towerId = 0;
    this.towerNoArr.unshift(obj2);
    this.towerNo = this.towerNoArr[0].towerNum;
  }
  unitChange(){
    if(this.unitName!='全部') {
      this.getUnitId();
      this.electricService.getAllLine(this.unitId)
        .subscribe(result=>{
          this.lineNameArr = result;
          this.lineName = this.lineNameArr[0].lineName;
          this.lineChange();
        })
    }else if(this.unitName=='全部'){
      this.getInit();
    }
  }
  getTowerId(){
    for(let i=0;i<this.towerNoArr.length;i++){
      if(this.towerNo == this.towerNoArr[i].towerNum){
        this.towerId = this.towerNoArr[i].towerId;
        break;
      }
    }
  }
  getLineId(){
    for(let j=0;j<this.lineNameArr.length;j++){
      if(this.lineName==this.lineNameArr[j].lineName){
        this.lineId = this.lineNameArr[j].lineId;
        break;
      }
    }
  }
  getUnitId(){
    for (let i = 0; i < this.unitNameArr.length; i++) {
      if (this.unitName == this.unitNameArr[i].unitName) {
        this.unitId = this.unitNameArr[i].unitId;
        break;
      }
    }
  }
  lineChange(){
    if(this.lineName!='全部'){
      this.getLineId();
      this.electricService.getAllTower(this.lineId)
        .subscribe(result=>{
          this.towerNoArr = result;
          this.towerNo = this.towerNoArr[0].towerNum;
        })
    }
  }
  search(){
    if(this.unitName=='全部'){
      this.getDateInfo(this.appId,0,0,0,this.page,this.pageMaxItem);
    }else if(this.unitName!='全部'){
      this.getUnitId();
      this.getLineId();
      this.getTowerId();
      this.getDateInfo(this.appId,this.unitId,this.lineId,this.towerId,this.page,this.pageMaxItem);
    }
  }
  getDateInfo(appId,unitId,lineId,towerId,page,size){
    this.electricService.getDateManage(appId,unitId,lineId,towerId,page,size)
      .subscribe(result=>{
        this.dataInfo = result.content;
      })
  }
  checkAll(){
    this.all_selected = !this.all_selected;
    if(this.all_selected){
      for(let i=0;i<this.dataInfo.length;i++){
        this.dataInfo[i].selected = true;
      }
    }else{
      for(let i=0;i<this.dataInfo.length;i++){
        this.dataInfo[i].selected = !this.dataInfo[i].selected;
      }
    }
  }
  check(index){
    if (this.all_selected) {
      this.all_selected = !this.all_selected;
    }
    this.dataInfo[index].selected = !this.dataInfo[index].selected;
  }
  dia(){
    let towerId = '';
    for(let i=0;i<this.dataInfo.length;i++){
      if(this.dataInfo[i].selected){
        towerId+=this.dataInfo[i].towerId+',';
        this.delete_towerIds = towerId.substring(0,towerId.length-1);
        if(this.dataInfo[i].patrolTaskSet.length==0){
          this.tip_content = '是否确认删除该杆塔号！';
        }else{
          this.electricService.deletePatrolTowers(this.delete_towerIds)
            .subscribe(result=>{
              this.tip_content = '有杆塔号下存在任务，不可删除！';
            })
          break;
        }
      }
    }
    this.deleteShow = true;
  }
  deleteShowChange(event){
    this.deleteShow = event;
    this.search();
  }
  addInspection(){
    this.router.navigate(['../createinspection'],{queryParams: {'title':"新建巡检信息"}});
  }
  look(item){
    console.log(item);
    this.router.navigate(['../createinspection'],{queryParams: {'title':'查看巡检信息','unitName':item.patrolUnit.unitName,'voltageGrade':item.voltageGrade,'lineName':item.patrolLine.lineName,'towerNum':item.towerNum,'towerLongitude':item.towerLongitude,'towerLatitude':item.towerLatitude,'notes':item.notes}});
  }
  edit(item){
    console.log(item);
    this.router.navigate(['../createinspection'],{queryParams: {'title':'修改巡检信息','towerId':item.towerId,'unitName':item.patrolUnit.unitName,'voltageGrade':item.voltageGrade,'lineName':item.patrolLine.lineName,'towerNum':item.towerNum,'towerLongitude':item.towerLongitude,'towerLatitude':item.towerLatitude,'notes':item.notes,'createTime':item.createTime}});
  }
}
