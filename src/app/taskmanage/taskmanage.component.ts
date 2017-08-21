import { Component } from '@angular/core';
import {OfflineService} from "../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "app/common/defs/resources";
declare var $:any;
@Component({
  selector: 'task-manage',
  styleUrls: ['./css/taskmanage.component.css'],
  templateUrl: './templates/taskmanage.html',
  providers: [OfflineService]
})
export class TaskManageComponent {
  appId:string;
  appCate:string;
  taskList:any[]=[];
  alarmStatus:string;
  allFlag:boolean=false;
  taskName:string;
  page: number = 1;
  pageMaxItem: number = 10;
  pageParams = new Page();
  status:string;
  alarmStatusArr:any[]=["全部","完成","进行中","未启动","暂停"];
  constructor(private offlineService:OfflineService, private route: ActivatedRoute ,private router: Router) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    console.log(this.appId);
    console.log(this.appCate);
    this.getAllTask(this.appId,this.page-1,this.pageMaxItem);

    this.alarmStatus = this.alarmStatusArr[0];
  }
  getPageData(paraParam) {
    this.getAllTask(this.appId,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  getAllTask(id,page,size){
    this.offlineService.getWarnTask(id,page,size)
      .subscribe(result=>{
        this.taskList = result.content;
        console.log(result.content);
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }
  allSel(){
    for(var i in this.taskList){
      if(this.allFlag==false){
        this.taskList[i]['flag']=1;
      }else{
        this.taskList[i]['flag']=2;
      }
    }
    if(this.allFlag==false){
      this.allFlag=true;
    }else{
      this.allFlag=false;
    }
  }
  check(item){
    if(item.flag!=1){
      item.flag=1;
    }else{
      item.flag=2;
      this.allFlag=false;
    }
    for(var i in this.taskList){
      if(this.taskList['flag']!=1){
        this.allFlag=false;
        return;
      }else{
        this.allFlag=true;
      }
    }
  }
  runChannel(item){
    if(item.taskStatus!='进行中'){
      this.status='开始';
    }else if(item.taskStatus=='进行中'){
      this.status='暂停';
    }
    this.offlineService.offlineSwitch(item.taskId,this.status)
      .subscribe(reply => this.start_reply(reply));
  }
  start_reply(reply){
    if(reply.status==200){
      console.log("Start Successfully!");
    }else{
      console.log("Start Failed!");
    }
    this.getAllTask(this.appId,this.page-1,this.pageMaxItem);
  }
  searchTask(){
    if(this.taskName==undefined){
      this.taskName=null;
    }
    this.offlineService.searchTask(this.appId,this.taskName,this.alarmStatus,this.page-1,this.pageMaxItem)
      .subscribe(result=>{
        this.taskList = result.content;
      })
  }
  edit(item){
    console.log(item);
    this.router.navigate(['../createtext'],{queryParams: {'taskName':item.taskName,'alarmRules':item.alarmRules,'inputPath':item.inputPath,'taskTitle':"修改任务"}});
  }
  look(item){
    this.router.navigate(['../createtext'],{queryParams: {'taskName':item.taskName,'alarmRules':item.alarmRules,'inputPath':item.inputPath,'taskTitle':"查看任务"}});
  }
/*  dia(){
    for(let i in this.taskList){
      if(this.taskList[i]['flag'] == '1'&&this.taskList[i].alarmRuleStatus=='进行中'){
        this.deleteIndex =1;
        this.tip_title = '提示';
        this.tip_content = '该告警不可删除！';
        return false;
      }else if(this.taskList[i]['flag'] == '1'&&this.taskList[i].alarmRuleStatus=='关闭'){
        this.deleteIndex =1;
        this.tip_title = '删除';
        this.tip_content = '是否删除该告警！';
        this.deleteIdArr.push(this.taskList[i]);
      }
    }
  }*/
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
}
