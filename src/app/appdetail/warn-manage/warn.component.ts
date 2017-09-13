import { Component, OnInit} from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SERVER_URL} from "../../app.constants";
import {calc_height} from "app/common/ts/calc_height";
declare var $:any;
@Component({
  selector: 'apt-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.css'],
  providers: [WarnService,OfflineService]
})
export class WarnComponent{
  SERVER_URL = SERVER_URL;
  allFlag:boolean=false;
  channelInfo:any[]=[];
  chanNameArr:any[]=[];
  warnRlueArr:any[]=[];
  appId:string;
  warnRlue:string;
  chanName:string;
  warnStatus:string;
  warnInfo:any[]=[];
  pageParams = new Page();
  page: number = 1;
  pageMaxItem: number = 10;
  pageNow:number;
  pageChange:number;
  startTime:string;
  endTime:string;
  statusArr:any[]=["全部","已处理","未处理"];
  ruleId:number;
  appCate:string;
  warnTask:string;
  warnTaskArr:any[]=[];
  allWarn:any[]=[];
  lookIndex:number=0;
  detaillist:any={};
  seeIndex:number=0;
  taskName:number;
  alarmIds:string='';
  sourcePaths:string='';
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  interval: any;
  sessionRules:string;
  status:string;
  imageUrl:string;
  constructor(private warnService: WarnService,private offlineService: OfflineService , private route: ActivatedRoute , private router: Router) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    this.searchWarn(this.appId,null,-1,'全部',this.page-1,this.pageMaxItem,null,null);
    if(this.appCate=="实时流分析"){
      this.interval = setInterval(() => {
        if(sessionStorage.getItem("name")){
          this.chanName = sessionStorage.getItem("name");
        }
        this.session();
        if(this.pageNow){
          this.searchWarn(this.appId,null,-1,'全部',this.pageNow-1,this.pageMaxItem,null,null);
        }
      }, 30000);
    }else{
      this.interval = setInterval(() => {
        if(sessionStorage.getItem("task")){
          this.warnTask = sessionStorage.getItem("task");
        }
        this.session();
        if(this.pageNow){
          this.searchWarn(this.appId,null,-1,'全部',this.pageNow-1,this.pageMaxItem,null,null);
        }
      }, 360000);
    }
    this.warnService.getWarnRules(this.appId)
      .subscribe(result=>{
        this.warnRlueArr = result.content;
        this.warnRlueArr.unshift({"ruleId":-1,"ruleName":'全部'});
        console.log(this.warnRlueArr);
        if(this.warnRlueArr.length>0){
          this.warnRlue = this.warnRlueArr[0].ruleName;
          this.ruleId = this.warnRlueArr[0].ruleId;
        }
      })
    this.warnService.getChanName(this.appId)
      .subscribe(result=>{
        this.chanNameArr=result;
        console.log(this.chanNameArr);
        this.chanNameArr.unshift('全部');
        this.chanName = this.chanNameArr[0];
      })
    this.offlineService.getWarnTask(this.appId)
      .subscribe(result=>{
        this.warnTaskArr = result.content;
        this.warnTaskArr.unshift({"taskId":-1,"taskName":'全部'});
        console.log(this.warnTaskArr);
        if(this.warnTaskArr.length>0){
          this.warnTask = this.warnTaskArr[0].taskName;
        }
      })
    this.warnStatus = this.statusArr[0];
    this.route.params.subscribe((param) => {
      if(JSON.stringify(param) != "{}"){
        console.log(param);
        this.warnStatus = param['status'];
        console.log(this.warnStatus);
        if(this.appCate=='实时流分析'){
          this.searchWarn(this.appId,null,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
        }else{
          this.searchWarn(this.appId,null,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
        }
      }
    });

  }
  ngAfterViewInit(){
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));

  }
  session(){
    if(sessionStorage.getItem("rule")){
      this.warnTask = sessionStorage.getItem("rule");
    }
    if(sessionStorage.getItem("status")){
      this.warnRlue = sessionStorage.getItem("status");
    }
    if(sessionStorage.getItem("start")){
      $('#start').val(sessionStorage.getItem("start"));
    }
    if(sessionStorage.getItem("end")){
      $('#end').val(sessionStorage.getItem("end"));
    }
  }
  ngOnDestroy(){
    clearInterval(this.interval);
  }
  ngOnInit() {
    calc_height(document.getElementById('warn-content'));
    $("#start").jeDate({
      isinitVal:true,
      festival: false,
      format: 'YYYY-MM-DD hh:mm:ss',
    });
    $("#end").jeDate({
      isinitVal:true,
      festival: false,
      format: 'YYYY-MM-DD hh:mm:ss'
    });

    this.startTime = $('#start').val("");
    this.endTime = $('#end').val("");
    this.route.queryParams.subscribe(params => {
      if(JSON.stringify(params) != "{}"&& !params.pageNo){
        console.log(params);
        this.taskName = params['taskName'];
        this.warnService.searchOffWarns(this.appId,this.taskName,-1,'全部',this.page-1,this.pageMaxItem,null,null)
          .subscribe(result=>{
            this.getWarnList(result);
          })
      }
    });

  }
  getAllWarn(id,page,size){
    this.warnService.getAllWarn(id,page,size)
      .subscribe(result=>{
        console.log(result.content);
        this.getWarnList(result);
      })
  }
  allSel(){
    for(var i in this.allWarn){
      if(this.allFlag==false){
        this.allWarn[i]['flag']=1;
      }else{
        this.allWarn[i]['flag']=2;
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
    for(var i in this.allWarn){
      if(this.allWarn['flag']!=1){
        this.allFlag=false;
        return;
      }else{
        this.allFlag=true;
      }
    }
  }
  lookPhoto(item){
    // this.router.navigate(['../warndetail'],{queryParams: {'detailList':item}});
    this.lookIndex=1;
    this.detaillist = item;
    console.log(this.detaillist);
  }
  thumbnail(){
    this.seeIndex = 2;
}
  seePhoto(url){
    this.seeIndex = 1;
    this.imageUrl = url;
    //console.log(this.imageUrl);
  }
  close(){
    this.seeIndex = 0;
  }
  getPageData(paraParam){
    this.searchWarn(this.appId,null,-1,'全部',paraParam.curPage-1,paraParam.pageMaxItem,null,null);

    this.pageNow=paraParam.curPage;
    console.log(this.pageNow);
  }
  date(item){
    var d = new Date(item);
    return ((d.getHours()<10)?('0'+(d.getHours()-8)):(d.getHours()-8)) + ':' + ((d.getMinutes()<10)?('0'+d.getMinutes()):d.getMinutes()) + ':' + ((d.getSeconds()<10)?('0'+d.getSeconds()):d.getSeconds());
  }
  handling(item){
    this.warnService.handlingWarn(item.alarmId,this.appId)
      .subscribe(result=>{
        this.searchWarn(this.appId,null,-1,'全部',this.page-1,this.pageMaxItem,null,null);
      })
  }
  deleteChange(event){
    this.deleteIndex = event;
  }
  lookHandling(item){
    item.alarmStatus = '已处理';
  }
  getWarnList(result){
    this.allWarn = result.content;
    console.log(this.allWarn);
    let page = new Page();
    page.pageMaxItem = result.size;
    page.curPage = result.number+1;
    page.totalPage = result.totalPages;
    page.totalNum = result.totalElements;
    this.pageParams = page;
  }
  export(){
    this.alarmIds='';
    this.sourcePaths='';
    for(let i in this.allWarn){
      if(this.allWarn[i]['flag'] == '1'){
          console.log(this.allWarn[i]);
          this.alarmIds += this.allWarn[i].alarmId+',';
        this.sourcePaths+=this.allWarn[i].imagePath+',';
      }
    }
    if(this.alarmIds==''||this.sourcePaths==''){
      this.deleteIndex = 1;
      this.tip_title = "提示";
      this.tip_content = "请选择任务！";
      return false
    }
    console.log(this.alarmIds.substring(0,this.alarmIds.length-1));
    console.log(this.sourcePaths.substring(0,this.sourcePaths.length-1));
    this.warnService.alarmExport(this.appId,this.appCate,this.alarmIds.substring(0,this.alarmIds.length-1),this.sourcePaths.substring(0,this.sourcePaths.length-1))
     .subscribe(result=>{
       console.log(result.text());
       let url = decodeURIComponent(result.text());
       console.log(SERVER_URL+url);
       window.open(SERVER_URL+"/"+url);
     })
  }
  sessionSet(){
    sessionStorage.setItem("rule" , this.sessionRules);
    sessionStorage.setItem("status" , this.warnStatus);
    sessionStorage.setItem("start" , this.startTime);
    sessionStorage.setItem("end" , this.endTime);
  }
  validation(){
    this.startTime = $('#start').val();
    this.endTime = $('#end').val();
    for(let i=0;i<this.warnRlueArr.length;i++){
      console.log(this.warnRlueArr[i].ruleName);
      if(this.warnRlueArr[i].ruleName == this.warnRlue){
        this.ruleId = this.warnRlueArr[i].ruleId;
        this.sessionRules = this.warnRlueArr[i].ruleName;
      }
    }
    if(this.startTime==''){
      this.startTime=null;
    }
    if(this.endTime==''){
      this.endTime=null;
    }
  }
  search(){
    this.validation();
    if(this.appCate=='实时流分析'){
      sessionStorage.setItem("name" , this.chanName);
      this.sessionSet();
      if(this.chanName=='全部'){
        this.searchWarn(this.appId,null,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.startTime,this.endTime);
      }else{
        this.searchWarn(this.appId,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.startTime,this.endTime);
      }
    }else{
      sessionStorage.setItem("task" , this.warnTask);
      this.sessionSet();
      if(this.warnTask=='全部'){
        this.searchWarn(this.appId,null,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.startTime,this.endTime);
      }else{
        this.searchWarn(this.appId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.startTime,this.endTime);
      }

    }

  }
  searchWarn(id,nameTask,ruleId,status,page,size,start,end){
    if(this.appCate=='实时流分析'){
      //console.log(this.appId);
      //console.log(this.ruleId);
      this.warnService.searchWarns(id,nameTask,ruleId,status,page,size,start,end)
        .subscribe(result=>{
          this.getWarnList(result);
        })
    }else{
      this.warnService.searchOffWarns(id,nameTask,ruleId,status,page,size,start,end)
        .subscribe(result=>{
          this.getWarnList(result);
        })
    }
  }
  save(item){
    this.warnService.handlingWarn(item.alarmId,this.appId)
      .subscribe(result=>{
        for(let i=0;i<result.length;i++){
          if(result[i].alarmId == item.alarmId){
            this.detaillist.alarmStatus = result[i].alarmStatus;
          }
        }
      })
    this.lookIndex = 0;

  }
  cancel(){
    this.lookIndex = 0;
  }
}
