import { Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ElectricService} from "../../../common/services/electric.service";
import {Page} from "../../../common/defs/resources";
import {SERVER_URL} from "../../../app.constants";
declare var $:any;
@Component({
  selector: 'task-result',
  styleUrls: ['./task.result.component.css'],
  templateUrl: './task.result.component.html',
  providers: [ElectricService]
})
export class TaskResultComponent {
  SERVER_URL = SERVER_URL;
  allInfo:any={};
  flawPartSet:any[]=[];
  lineSet:any[]=[];
  towerSet:any[]=[];
  line:string;
  tower:string;
  flawPart:string;
  status:string;
  taskId:number;
  lineId:number;
  towerId:number;
  pageParams = new Page();
  page: number = 0;
  pageMaxItem: number = 10;
  pageNo:number=0;
  pageSize:number=10;
  taskInfo:any[]=[];
  flawPartId:number=0;
  statusId:number=0;
  statusArr:any[]=["全部","正常","已忽略"];
  seeIndex:number=0;
  imageUrl:string;
  imageFlawUrl:string;
    constructor(private router:Router,private route: ActivatedRoute,private electricService:ElectricService) {
      this.status = this.statusArr[0];
      this.route.queryParams.subscribe(params => {
        if(params['allInfo']){
          console.log(JSON.parse(params['allInfo']));
          this.allInfo = JSON.parse(params['allInfo']);
          this.taskId = this.allInfo.taskId;
          this.electricService.getFlawPart(this.taskId)
            .subscribe(result=>{
              this.flawPartSet = result;
              this.flawPartSet.unshift("全部");
              this.flawPart = this.flawPartSet[0];
            })
          this.getTaskResultSearch(this.taskId,0,0);
        }
      });
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  ngOnInit() {
  }
  identify(item){
    let obj:string= '';
    for(let i=0;i<item.length;i++){
        obj += item[i].flawName+',';
    }
    return obj.substring(0,obj.length-1);
  }
  neglect(item){
    this.electricService.neglect(item.infoId)
      .subscribe(result=>{
        console.log(result);
        this.getFlawPart()
      })
  }
  photo(url){
    console.log(url);
    this.seeIndex = 1;
    this.imageUrl = url;
  }
  flawPhoto(item){
    console.log(item);
    this.seeIndex = 1;
    this.imageUrl = item;
  }
  close(){
    this.seeIndex = 0;
  }
  edit(item){
    this.router.navigate(['../editresult'],{queryParams: {'allInfo':JSON.stringify(item)}});
  }
  getPageData(paraParam){
    this.getTaskResult(this.taskId,this.lineId,this.towerId,this.flawPart,this.status,paraParam.curPage-1,paraParam.pageMaxItem);
    this.pageNo = paraParam.curPage-1;
    this.pageSize = paraParam.pageMaxItem;
  }
  getTaskResult(taskId,lineId,towerId,flawPartId,infoStatus,page,size){
    this.electricService.getTaskResult(taskId,lineId,towerId,flawPartId,infoStatus,page,size)
      .subscribe(result=>{
        console.log(result);
        this.taskInfo = result.content;
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }

  getTaskResultSearch(taskId,lineId,towerId){
    this.electricService.getTaskResultSearch(taskId,lineId,towerId)
      .subscribe(result=>{
          this.towerSet = result.towerSet;
          this.lineSet = result.lineSet;
          let obj:any={};
          obj.lineName="全部";
          obj.lineId = 0;
          this.lineSet.unshift(obj);
          let obj1:any={};
          obj1.towerNum="全部";
          obj1.towerId = 0;
          this.towerSet.unshift(obj1);
          this.line = this.lineSet[0].lineName;
          this.lineId = this.lineSet[0].lineId;
          this.tower = this.towerSet[0].towerNum;
          this.towerId = this.towerSet[0].towerId;
          this.getFlawPart();
      })
  }
  getFlawPart(){
    if(this.pageNo==0){
      if(this.flawPart=="全部"&&this.status=="全部"){
        this.getTaskResult(this.taskId,this.lineId,this.towerId,-1,-1,this.page,this.pageMaxItem);
      }else if(this.flawPart=="全部"&&this.status!="全部"){
        this.getTaskResult(this.taskId,this.lineId,this.towerId,-1,this.status,this.page,this.pageMaxItem);
      }else if(this.flawPart!="全部"&&this.status!="全部"){
        this.getTaskResult(this.taskId,this.lineId,this.towerId,this.flawPart,this.status,this.page,this.pageMaxItem);
      }else if(this.flawPart!="全部"&&this.status=="全部"){
        this.getTaskResult(this.taskId,this.lineId,this.towerId,this.flawPart,-1,this.page,this.pageMaxItem);
      }
    }else{
      if(this.flawPart=="全部"&&this.status=="全部"){
        this.getTaskResult(this.taskId,this.lineId,this.towerId,-1,-1,this.pageNo,this.pageSize);
      }else if(this.flawPart=="全部"&&this.status!="全部"){
        this.getTaskResult(this.taskId,this.lineId,this.towerId,-1,this.status,this.pageNo,this.pageSize);
      }else if(this.flawPart!="全部"&&this.status!="全部"){
        this.getTaskResult(this.taskId,this.lineId,this.towerId,this.flawPart,this.status,this.pageNo,this.pageSize);
      }else if(this.flawPart!="全部"&&this.status=="全部"){
        this.getTaskResult(this.taskId,this.lineId,this.towerId,this.flawPart,-1,this.pageNo,this.pageSize);
      }
    }
  }
  getTaskResultSearch1(taskId,lineId,towerId){
    this.electricService.getTaskResultSearch(taskId,lineId,towerId)
      .subscribe(result=>{
        this.towerSet = result.towerSet;
        this.lineSet = result.lineSet;
        let obj:any={};
        obj.lineName="全部";
        obj.lineId = 0;
        this.lineSet.unshift(obj);
        let obj1:any={};
        obj1.towerNum="全部";
        obj1.towerId = 0;
        this.towerSet.unshift(obj1);
        console.log(this.towerSet);
        console.log(this.lineSet);
        this.getFlawPart();
      })
  }
  lineChange(){
    for(let i=0;i<this.lineSet.length;i++){
      if(this.line==this.lineSet[i].lineName){
        this.line = this.lineSet[i].lineName;
        this.lineId = this.lineSet[i].lineId;
      }
    }
    this.getTaskResultSearch1(this.taskId,this.lineId,this.towerId);
  }
  towerChange(){
    for(let i=0;i<this.towerSet.length;i++){
      if(this.tower==this.towerSet[i].towerNum){
        this.towerId = this.towerSet[i].towerId;
      }
    }
    this.getTaskResultSearch1(this.taskId,this.lineId,this.towerId);
  }
  flawPartChange(){
    this.getFlawPart();
  }
  back(){
    this.router.navigate(['../electaskmanage']);
  }
}
