import { Component } from '@angular/core';
import {OfflineService} from "../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "app/common/defs/resources";
import {calc_height} from "../common/ts/calc_height";
import {WebSocketService} from "../common/services/web-socket.service";
declare var $:any;
@Component({
  selector: 'task-manage',
  styleUrls: ['./css/taskmanage.component.css'],
  templateUrl: './templates/taskmanage.html',
  providers: [OfflineService,WebSocketService]
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
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  deleteIdArr:any[]=[];
  percent:any[]=[];
  interval: any;
  interval1: any;
  pageNow:number;
  constructor(private offlineService:OfflineService, private route: ActivatedRoute ,private router: Router,private websocket: WebSocketService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    //console.log(this.appId);
    //console.log(this.appCate);
    this.getTask(this.appId,null,'全部',this.page-1,this.pageMaxItem);
/*    this.interval = setInterval(() => {
      this.getTask(this.appId,null,'全部',this.page-1,this.pageMaxItem);
    }, 10000);*/
    this.alarmStatus = this.alarmStatusArr[0];
    this.route.params.subscribe((param) => {
      if(JSON.stringify(param) != "{}"){
        console.log(param);
        this.alarmStatus = param['status'];
        console.log(this.alarmStatus);
        this.getTask(this.appId,null,this.alarmStatus,this.page-1,this.pageMaxItem);
      }
    });
  }
  ngOnInit() {
    calc_height(document.getElementById('task_body'));
  }
  ngOnDestroy(){
    clearInterval(this.interval);
    clearInterval(this.interval1);
    this.websocket.stopWebsocket();
  }
  getPageData(paraParam) {
    //this.getAllTask(this.appId,paraParam.curPage-1,paraParam.pageMaxItem);
    this.getTask(this.appId,this.taskName,this.alarmStatus,paraParam.curPage-1,paraParam.pageMaxItem);
    this.pageNow=paraParam.curPage;
/*    sessionStorage['taskCurPage'] = this.pageNow;
    console.log(sessionStorage['taskCurPage']);*/
  }
  getAllTask(id,page,size){
    this.offlineService.getWarnTask(id,page,size)
      .subscribe(result=>{
        this.taskList = result.content;
        for(let i=0;i<result.content.length;i++){
          if(result.content[i].taskStatus=='进行中'){
            this.websocket.connect().then(() => {
              this.websocket.subscribe('/taskPercent/' + result.content[i].taskId,(data) =>{
                this.percent = data.offlineFiles;
              });
            })
          }
        }
        console.log(result.content);
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }
  running(item){
    console.log(item);
    this.percent = [];
    if(item.taskStatus=='进行中'){
      item.show = 1;
      this.websocket.connect().then(() => {
        console.log(item.taskId);
        this.websocket.subscribe('/taskPercent/' + item.taskId,(data) =>{
          this.percent = data.offlineFiles;
        });
      })
    }
  }
  stopped(item){
    item.show = 2;
    this.websocket.stopWebsocket();
  }
  output(item){
    let ruleName ='';
    for(let i=0;i<item.length;i++){
      ruleName += item[i].ruleName + ',';
    }
    return ruleName.substring(0,ruleName.length-1);
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
      this.status='进行中';
    }else if(item.taskStatus=='进行中'){
      this.status='暂停';
      this.websocket.stopWebsocket();
    }
    this.offlineService.offlineSwitch(item.taskId,this.status)
      .subscribe(reply =>{
        if(reply.text().substring(0,2)=='No'){
          this.deleteIndex = 1;
          this.tip_title = "提示";
          this.tip_content = "请开启规则！";
        }else if(reply.text().substring(0,2)=='Er'){
          this.deleteIndex = 1;
          this.tip_title = "提示";
          this.tip_content = reply.text().substring(5);
        }
/*        this.interval = setInterval(() => {
          this.getAllTask(this.appId,this.page-1,this.pageMaxItem);
        }, 3000);*/
        this.getTask(this.appId,null,this.alarmStatus,this.page-1,this.pageMaxItem);
        this.start_reply(reply);
      } );
  }
  start_reply(reply){
    if(reply.status==200){
      console.log("Start Successfully!");
    }else{
      console.log("Start Failed!");
    }
    this.getTask(this.appId,null,'全部',this.page-1,this.pageMaxItem);
  }
  searchTask(){
    if(this.taskName==undefined||this.taskName==''){
      this.taskName=null;
    }
    clearInterval(this.interval);
    // this.search(this.appId,this.taskName,this.alarmStatus,this.page-1,this.pageMaxItem);
  }
  search(){
    this.searchTask();
    this.getTask(this.appId,this.taskName,this.alarmStatus,this.page-1,this.pageMaxItem);
  }
  getTask(id,name,status,page,size){
    this.offlineService.searchTask(id,name,status,page,size)
      .subscribe(result=>{
        this.taskList = result.content;
        if(this.alarmStatus=='进行中'){
          this.interval1 = setInterval(() => {
            this.getTask(this.appId,this.taskName,this.alarmStatus,this.page-1,this.pageMaxItem);
          }, 10000);
        }
      })
  }
  getPercent(item){
    return (item*100).toFixed(2)+'%';
  }
  add(){
    this.router.navigate(['../createtext'],{queryParams: {'taskTitle':"新建任务"}});
  }
  edit(item){
    console.log(item);
    this.router.navigate(['../createtext'],{queryParams: {'taskId':item.taskId,'taskName':item.taskName,'alarmRules':JSON.stringify(item.alarmRules),'taskTitle':"修改任务"}});
  }
  look(item){
    this.router.navigate(['../warnmanage'],{queryParams: {'taskName':item.taskName}});
  }

  dia(){
    for(let i in this.taskList){
      if(this.taskList[i]['flag'] == '1'&&this.taskList[i].taskStatus=='进行中'){
        this.deleteIndex =1;
        this.tip_title = '提示';
        this.tip_content = '该任务不可删除！';
        return false;
      }else if(this.taskList[i]['flag'] == '1'&&this.taskList[i].taskStatus!='进行中'){
        this.deleteIdArr.push(this.taskList[i]);
      }
    }
    this.deleteIndex =1;
    this.tip_title = '删除';
    this.tip_content = '是否删除该任务！';
  }
  deleteChange(event){
    this.deleteIndex = event;
  }
  deletedChange(event){
    console.log(event);
    if(event==1){
      for(let i in this.deleteIdArr){
        console.log(this.deleteIdArr[i]);
        this.offlineService.delete(this.deleteIdArr[i].taskId)
          .subscribe(result=>{
            this.getTask(this.appId,null,'全部',this.page-1,this.pageMaxItem);
          })
      }
    }
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
}
