import {Component, ViewChild} from '@angular/core';
import {OfflineService} from "../common/services/offline.service";
import {SERVER_URL} from "../app.constants";
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
  SERVER_URL = SERVER_URL;
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
  alarmStatusArr:any[]=["全部","完成","进行中","未启动","已停止"];
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  deleteIdArr:any[]=[];
  percent:any[]=[];
  interval: any;
  interval1: any;
  interval2: any;
  pageNow:number;
  pageChange:number;
  _offline:any[]=[];
  authority:boolean = false;
  playShow:boolean=false;
  videoBtn:number=2;
  showBtn:boolean=false;
  outputPath:string;
  nameTem:string;
  tip_btn:string;
  photoShow:boolean = false;
  picturesNumber:any[]=[];
  photoIndex:number = 0;
  init:boolean = false;
  taskIds:any[]=[];
  @ViewChild('offlineVideo') offlineVideo: any;
  constructor(private offlineService:OfflineService, private route: ActivatedRoute ,private router: Router,private websocket: WebSocketService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
      //console.log(window.sessionStorage.getItem("_offline"));
      this._offline = JSON.parse(window.sessionStorage.getItem("_offline"));
      //console.log(this._offline);
      for(let i=0;i<this._offline.length;i++){
        if(this._offline[i].projectAuthorityId==11){
          this.authority = true;
        }
      }
    //console.log(this.appId);
    //console.log(this.appCate);
    this.getTask(this.appId,null,'全部',this.page-1,this.pageMaxItem);
    this.interval = setInterval(() => {
      this.init = true;
      if(this.taskName!=''&&this.taskName!=undefined){
        this.getTask(this.appId,this.taskName,'全部',this.page-1,this.pageMaxItem);
      }else{
        this.getTask(this.appId,null,'全部',this.page-1,this.pageMaxItem);
      }
    }, 10000);
    this.alarmStatus = this.alarmStatusArr[0];
    this.route.params.subscribe((param) => {
      if(JSON.stringify(param) != "{}"){
        //console.log(param);
        this.alarmStatus = param['status'];
        //console.log(this.alarmStatus);
        this.getTask(this.appId,null,this.alarmStatus,this.page-1,this.pageMaxItem);
      }
    });
  }
  ngOnInit() {
    calc_height(document.getElementById('task_body'));
  }
  ngOnDestroy(){
    clearInterval(this.interval);
    this.websocket.stopWebsocket();
  }
  getPageData(paraParam) {
    //this.getAllTask(this.appId,paraParam.curPage-1,paraParam.pageMaxItem);
    if(this.taskName==undefined){
      this.getTask(this.appId,null,this.alarmStatus,paraParam.curPage-1,paraParam.pageMaxItem);
    }else{
      this.getTask(this.appId,this.taskName,this.alarmStatus,paraParam.curPage-1,paraParam.pageMaxItem);
    }
    this.page=paraParam.curPage;
    this.pageMaxItem = paraParam.pageMaxItem;
/*    sessionStorage['taskCurPage'] = this.pageNow;
    console.log(sessionStorage['taskCurPage']);*/
  }
/*  getAllTask(id,page,size){
    this.offlineService.getWarnTask(id,page,size)
      .subscribe(result=>{
        //this.taskList = result.content;
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
        this.taskList = result.content;
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }*/
  lookResult(item){
    this.picturesNumber=[];
    this.photoIndex = 0;
    if(item.fileType=="video"){
      this.outputPath = item.outputPath;
      this.playShow=true;
    }else if(item.fileType=="image"||item.fileType=="zip"){
      let allImage = item.outputPath.split(',');
      this.picturesNumber = allImage;
      this.photoShow = true;
    }
  }
  clickLeft(){
    if(this.photoIndex==0){
      return false
    }else{
      this.photoIndex--;
    }
  }
  clickRight(){
    if(this.photoIndex==this.picturesNumber.length-1){
      return false
    }else{
      this.photoIndex++;
    }
  }
  closeVideo(){
    this.playShow=false;
    this.showBtn = false;
  }
  closePhtot(){
    this.photoShow = false;
  }
  show(){
    this.offlineVideo.nativeElement.controls = true;
  }
  hide(){
    this.offlineVideo.nativeElement.controls = false;
    this.videoBtn = 2;
    this.showBtn = false;
  }
  play() {
    if (this.offlineVideo.nativeElement.paused) {
      this.offlineVideo.nativeElement.play();
      this.showBtn = true;
    } else {
      this.offlineVideo.nativeElement.pause();
      this.showBtn = false;
    }

  }
  output1(item){
    if(item.length>0){
      return item.substring(23,item.length);
    }
  }
  output2(item){
    if(item.length>0){
      return item.substring(17,item.length);
    }
  }
  running(item){
    //console.log(item);
    this.percent = [];
    if(item.taskStatus=='进行中'){
      item.show = 1;
      this.websocket.connect().then(() => {
        console.log(item.taskId);
        this.websocket.subscribe('/taskPercent/' + item.taskId,(data) =>{
          this.percent = data.offlineFiles;
          this.percent.sort(function(a,b){
            return parseInt(a.fileId) - parseInt(b.fileId)
          });
          console.log(this.percent);
        });
      })
    }
  }
  stopped(item){
    item.show = 2;
    this.websocket.stopWebsocket();
  }
  output(item){
    item.sort(function(a,b){
      return parseInt(a.ruleId) - parseInt(b.ruleId)
    });
    let ruleName = '';
    for(let i=0;i<item.length;i++){
      ruleName += item[i].ruleName + ',';
    }
    return ruleName.substring(0,ruleName.length-1);
  }
  allSel(){
    let arr:any[]=[];
    for(var i in this.taskList){
      if(this.allFlag==false){
        this.taskList[i].selected=true;
        arr.push(this.taskList[i].taskId);
      }else{
        this.taskList[i].selected=false;
        arr.push(this.taskList[i].taskId);
      }
    }
    if(this.allFlag==false){
      this.allFlag=true;
      this.setOfflineTaskCheck(arr,true);
    }else{
      this.allFlag=false;
      this.setOfflineTaskCheck(arr,false);
    }
  }
  setOfflineTaskCheck(taskId,selected){
    this.offlineService.offlineTaskCheck(taskId,selected)
      .subscribe(result=>{
        //console.log(result);
      })
  }
  check(item){
    if(item.selected!=true){
      item.selected = true;
    }else{
      item.selected = false;
      this.allFlag=false;
    }
    this.taskIds=[];
    this.taskIds.push(item.taskId);
    this.setOfflineTaskCheck(this.taskIds,item.selected);
    this.allFlag=false;

    for(var i in this.taskList){
      if(!this.taskList['selected']){
        this.allFlag=false;
        return;
      }else{
        this.allFlag=true;
      }
    }
  }
  runChannel(item){
    let order:number=0;
    for(let i=0;i<this.taskList.length;i++){
      if(this.taskList[i].taskStatus=='进行中'&&item.taskStatus!='进行中'){
          order++;
          if(order==4){
            this.deleteIndex = 1;
            this.tip_title = "提示";
            this.tip_content = "任务分析仅支持4个并发，请等待其他任务运行完成！";
            this.tip_btn = 'map';
            return false;
          }
      }
    }
    if(item.taskStatus!='进行中'){
      this.status='进行中';
      this.alarmStatus = '全部';
    }else if(item.taskStatus=='进行中'){
      this.status='已停止';
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
          this.tip_content = "运行过程发生意外啦，请您重试！";
        }else{
          if(this.status=='进行中'){
            if(this.taskName==undefined){
              this.getTask(this.appId,null,this.alarmStatus,this.page-1,this.pageMaxItem);
              this.interval = setInterval(() => {
                  this.getTask(this.appId,null,this.alarmStatus,this.page-1,this.pageMaxItem);
              },10000);
            }else{
              this.getTask(this.appId,this.taskName,this.alarmStatus,this.page-1,this.pageMaxItem);
              this.interval = setInterval(() => {
                  this.getTask(this.appId,this.taskName,this.alarmStatus,this.page-1,this.pageMaxItem);
              },10000);
            }
          }else{
            clearInterval(this.interval);
            this.websocket.stopWebsocket();
            this.getTask(this.appId,null,this.alarmStatus,this.page-1,this.pageMaxItem);
          }
        }
        //this.start_reply(reply);
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
/*        for(let i=0;i<this.taskList.length;i++){
          if(this.taskList[i].taskStatus!='进行中'){
            clearInterval(this.interval);
          }
        }*/
        if(!this.init){
          for(let i=0;i<this.taskList.length;i++){
            this.taskList[i].selected = false;
            this.taskIds.push(this.taskList[i].taskId);
          }
          this.setOfflineTaskCheck(this.taskIds,false);
        }
        this.init = false;
/*        if(this.alarmStatus=='进行中'){
            if(this.taskName==undefined){
              this.getTask(this.appId,null,this.alarmStatus,this.page-1,this.pageMaxItem);
            }
            this.getTask(this.appId,this.taskName,this.alarmStatus,this.page-1,this.pageMaxItem);

        };*/
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }
/*  ngAfterViewChecked(){
    for(let i=0;i<this.taskList.length;i++){
      if(this.taskList[i].taskStatus!='进行中'){
        clearInterval(this.interval2);
      }
    }
  }*/
  getPercent(item){
    return (item*100).toFixed(2)+'%';
  }
  add(){
    this.router.navigate(['../createtext'],{queryParams: {'taskTitle':"新建任务"}});
  }
  edit(item){
    this.router.navigate(['../createtext'],{queryParams: {'taskId':item.taskId,'taskName':item.taskName,'fileType':item.fileType,'alarmRules':JSON.stringify(item.alarmRules),'taskTitle':"修改任务"}});
  }
  look(item){
    // console.log(JSON.stringify(item.alarmRules));
    this.router.navigate(['../warnmanage'],{queryParams: {'taskName':item.taskName,'taskId':item.taskId,"once":"true","alarmRules":JSON.stringify(item.alarmRules),"fileType":item.fileType}});
  }
  dia(){
    for(let i in this.taskList){
      if(this.taskList[i].selected&&this.taskList[i].taskStatus=='进行中'){
        this.deleteIndex =1;
        this.tip_title = '提示';
        this.tip_content = '该任务不可删除！';
        return false;
      }else if(this.taskList[i].selected&&this.taskList[i].taskStatus!='进行中'){
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
    if(event==1){
      let taskIds:string='';
      for(let i in this.deleteIdArr){
        taskIds+=this.deleteIdArr[i].taskId+',';
      }
      taskIds.substring(0,taskIds.length-1);
      this.offlineService.delete(taskIds)
        .subscribe(result=>{
          this.getTask(this.appId,null,'全部',this.page-1,this.pageMaxItem);
        })
    }
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
}
