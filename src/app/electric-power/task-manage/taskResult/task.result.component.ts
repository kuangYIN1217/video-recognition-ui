import { Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ElectricService} from "../../../common/services/electric.service";
import {Page} from "../../../common/defs/resources";
@Component({
  selector: 'task-result',
  styleUrls: ['./task.result.component.css'],
  templateUrl: './task.result.component.html',
  providers: [ElectricService]
})
export class TaskResultComponent {
  allInfo:any={};
  infoStatusSet:any[]=[];
  towerPartSet:any[]=[];
  lineSet:any[]=[];
  towerSet:any[]=[];
  line:string;
  tower:string;
  towerPart:string;
  status:string;
  taskId:number;
  lineId:number;
  towerId:number;
  flawPartId:number;
  pageParams = new Page();
  page: number = 0;
  pageMaxItem: number = 10;
    constructor(private router:Router,private route: ActivatedRoute,private electricService:ElectricService) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(JSON.parse(params['allInfo']));
      this.allInfo = JSON.parse(params['allInfo']);
      this.taskId = this.allInfo.taskId;
      this.getTaskResultSearch(this.taskId,0,0,0,-1);
    });
  }
  identify(item){
    let obj:string= '';
    for(let i=0;i<item.length;i++){
        obj += item[i].flawName+',';
    }
    return obj.substring(0,obj.length-1);
  }
  getPageData(paraParam){
    this.getTaskResult(this.taskId,this.lineId,this.towerId,this.flawPartId,this.status,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  getTaskResult(taskId,lineId,towerId,flawPartId,infoStatus,page,size){
    this.electricService.getTaskResult(taskId,lineId,towerId,flawPartId,infoStatus,page,size)
      .subscribe(result=>{
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }

  getTaskResultSearch(taskId,lineId,towerId,flawPartId,infoStatus){
    this.electricService.getTaskResultSearch(taskId,lineId,towerId,flawPartId,infoStatus)
      .subscribe(result=>{
          console.log(result);
          this.towerSet = result.towerSet;
          this.lineSet = result.lineSet;
          this.towerPartSet = result.towerPartSet;
          this.infoStatusSet = result.infoStatusSet;
          this.line = this.lineSet[0].lineName;
          this.lineId = this.lineSet[0].lineId;
          this.towerPart = this.towerPartSet[0].part;
          this.flawPartId = this.towerPartSet[0].partId;
          this.status = this.infoStatusSet[0];
          this.tower = this.towerSet[0].towerNum;
          this.towerId = this.towerSet[0].towerId;
      })
  }
  lineChange(item){
    for(let i=0;i<this.lineSet.length;i++){
      if(item==this.lineSet[i].lineName){
        this.lineId = this.lineSet[i].lineId;
      }
    }
    this.getTaskResultSearch(this.taskId,this.lineId,this.towerId,this.flawPartId,this.status);
  }
  towerChange(item){
    for(let i=0;i<this.towerSet.length;i++){
      if(item==this.towerSet[i].towerNum){
        this.towerId = this.towerSet[i].towerId;
      }
    }
    this.getTaskResultSearch(this.taskId,this.lineId,this.towerId,this.flawPartId,this.status);
  }
  towerPartChange(item){
    for(let i=0;i<this.towerPartSet.length;i++){
      if(item==this.towerPartSet[i].part){
        this.flawPartId = this.towerPartSet[i].partId;
      }
    }
    this.getTaskResultSearch(this.taskId,this.lineId,this.towerId,this.flawPartId,this.status);
  }
  statusChange(item){
    this.status = item;
    this.getTaskResultSearch(this.taskId,this.lineId,this.towerId,this.flawPartId,this.status);
  }
}
