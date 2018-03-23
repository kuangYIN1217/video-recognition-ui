import { Component, OnInit} from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SERVER_URL} from "../../app.constants";
import {calc_height} from "app/common/ts/calc_height";
declare var $:any;
@Component({
  selector: 'warn-time',
  templateUrl: './warntime.component.html',
  styleUrls: ['./warntime.component.css'],
  providers: [WarnService,OfflineService]
})
export class WarnTimeComponent{
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
  taskName:string;
  alarmIds:string='';
  sourcePaths:string='';
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  interval: any;
  sessionRules:string;
  status:string;
  imageUrl:string;
  downUrl:string;
  start:string;
  end:string;
  authority:boolean = false;
  _realTime:any[]=[];
  _offline:any[]=[];
  taskId:number=0;
  periodTime:string;
  periodTimeArr:any[]=[];
  startValue:string='';
  endValue:string='';
  constructor(private warnService: WarnService,private offlineService: OfflineService , private route: ActivatedRoute , private router: Router) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    if(this.appCate=="实时流分析"){
      /*      this._realTime = JSON.parse(window.sessionStorage.getItem("_realTime"));
       for(let i=0;i<this._realTime.length;i++){
       if(this._realTime[i].projectAuthorityId==6){
       this.authority = true;
       }
       }*/
      this.interval = setInterval(() => {
        if(sessionStorage.getItem("name")){
          this.chanName = sessionStorage.getItem("name");
        }
        this.session();
        this.getRuleId();
        if(this.pageNow){
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.chanName,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,null,null);
          }else{
            this.searchWarn(this.appId,0,this.chanName,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,null,null);
          }
        }else{
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
          }else{
            this.searchWarn(this.appId,0,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
          }
        }
      }, 15000);
    }else{
      this.interval = setInterval(() => {
        if(sessionStorage.getItem("task")){
          this.warnTask = sessionStorage.getItem("task");
        }
        this.session();
        this.getRuleId();
        if(this.pageNow){
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,null,null);
          }else{
            this.searchWarn(this.appId,0,this.warnTask,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,null,null);
          }
        }else{
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
          }else{
            this.searchWarn(this.appId,0,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
          }
        }
      }, 360000);
    }
    this.warnService.getWarnRules(this.appId)
      .subscribe(result=>{
        this.warnRlueArr = result.content;
        if(this.warnRlueArr.length>0){
          this.warnRlue = this.warnRlueArr[0].ruleName;
          this.ruleId = this.warnRlueArr[0].ruleId;
        }
      })
    this.warnService.getChanName(this.appId)
      .subscribe(result=>{
        this.chanNameArr=result;
        //console.log(this.chanNameArr);
        this.chanNameArr.unshift('全部');
        this.chanName = this.chanNameArr[0];
      })
    this.offlineService.getWarnTask(this.appId)
      .subscribe(result=>{
        this.warnTaskArr = result.content;
        this.warnTaskArr.unshift({"taskId":-1,"taskName":'全部'});
        //console.log(this.warnTaskArr);
        if(this.warnTaskArr.length>0){
          this.warnTask = this.warnTaskArr[0].taskName;
        }
      })
    this.warnStatus = this.statusArr[0];
    this.route.params.subscribe((param) => {
      if(JSON.stringify(param) != "{}"){
        //console.log(param);
        this.warnStatus = param['status'];
        //console.log(this.warnStatus);
        if(this.appCate=='实时流分析'){
          this.searchWarn(this.appId,0,this.chanName,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
        }else{
          this.searchWarn(this.appId,0,this.warnTask,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
        }
      }
    });
    this.route.queryParams.subscribe(params => {
      if(JSON.stringify(params) != "{}"&& !params.pageNo){
        //console.log(params);
        this.taskName = params['taskName'];
        this.taskId = params['taskId'];
        this.warnService.searchOffWarns(this.appId,this.taskId,this.taskName,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null)
          .subscribe(result=>{
            this.warnTask = this.taskName;
            this.getWarnList(result);
          })
      }
    });
    if(this.taskId<=0){
      this.searchWarn(this.appId,0,'全部',-1,'全部',this.page-1,this.pageMaxItem,null,null);
    }
  }
  ngAfterViewInit(){
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));

  }
  session(){
    if(sessionStorage.getItem("rule")){
      this.warnRlue = sessionStorage.getItem("rule");
    }
    if(sessionStorage.getItem("status")){
      this.warnStatus = sessionStorage.getItem("status");
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
  getHeight(){
    let height = window.innerHeight-140;
    return{
      "height":height+'px'
    }
  }
  ngOnInit() {
    if(this.appCate=="实时流分析"){
      $("#start").jeDate({
        isinitVal:true,
        festival: false,
        format: 'YYYY-MM-DD hh:mm:ss'
      });
      $("#end").jeDate({
        isinitVal:true,
        festival: false,
        format: 'YYYY-MM-DD hh:mm:ss'
      });
    }else{
      $("#start").jeDate({
        isinitVal:true,
        festival: false,
        format: 'hh:mm:ss'
      });
      $("#end").jeDate({
        isinitVal:true,
        festival: false,
        format: 'hh:mm:ss'
      });
    }
    calc_height(document.getElementById('warn-content'));
    this.startTime = $('#start').val("");
    this.endTime = $('#end').val("");
  }
  /*  getAllWarn(id,page,size){
   this.warnService.getAllWarn(id,page,size)
   .subscribe(result=>{
   console.log(result.content);
   this.getWarnList(result);
   })
   }*/
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
    //console.log(this.detaillist);
  }
  thumbnail(){
    this.seeIndex = 2;
  }
  seePhoto(url){
    //console.log(url);
    this.seeIndex = 1;
    this.imageUrl = url.slice(23);
  }
  slicePath(url){
    return url.slice(23)
  }
  downPhoto(url){
    this.downUrl = url;
    document.getElementById('down').click();
  }
  getDownPath(url){
    return url.slice(23);
  }
  close(){
    this.seeIndex = 0;
  }
  getPageData(paraParam){
    if(this.appCate=="实时流分析"){
      this.validation();
      this.sessionSet();
      this.session();
      if(this.warnRlue=='全部'){
        this.judgeTime();
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.chanName,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start,this.end);
        }else{
          this.searchWarn(this.appId,0,this.chanName,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start,this.end);
        }
      }else{
        this.judgeTime();
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.chanName,this.ruleId,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start,this.end);
        }else{
          this.searchWarn(this.appId,0,this.chanName,this.ruleId,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start,this.end);
        }
      }
    }else{
      this.validation();
      this.sessionSet();
      this.session();
      if(this.warnRlue=='全部'){
        this.judgeTime();
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.warnTask,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start,this.end);
        }else{
          this.searchWarn(this.appId,0,this.warnTask,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start,this.end);
        }
      }else{
        this.judgeTime();
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start,this.end);
        }else{
          this.searchWarn(this.appId,0,this.warnTask,this.ruleId,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start,this.end);
        }
      }
    }
    this.pageNow=paraParam.curPage;
    this.pageChange = Number(paraParam.pageMaxItem);
    //console.log(this.pageNow,Number(this.pageChange));
  }
  getRuleId(){
    if(this.warnRlue=='全部'){
      this.ruleId = -1;
    }else{
      for(let i=0;i<this.warnRlueArr.length;i++){
        //console.log(this.warnRlueArr[i].ruleName);
        if(this.warnRlueArr[i].ruleName == this.warnRlue){
          this.ruleId = this.warnRlueArr[i].ruleId;
        }
      }
    }
  }
  judgeTime(){
    if($('#start').val()==''){
      this.start = null;
    }else{
      this.start = this.startTime;
    }
    if($('#end').val()==''){
      this.end = null;
    }else{
      this.end = this.endTime;
    }
  }
  date(item){
    if(item){
      let time = item.split('T');
      //console.log(time[0]+' '+time[1].substring(0,8));
      return time[0]+' '+time[1].substring(0,8);
    }
  }
  date1(item){
    if(item){
      let time = item.split('T');
      return time[1].substring(0,8);
    }
  }
  getTime(item){
    var d = new Date(item);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + ((d.getHours()<10)?('0'+d.getHours()):d.getHours()) + ':' + ((d.getMinutes()<10)?('0'+d.getMinutes()):d.getMinutes()) + ':' + ((d.getSeconds()<10)?('0'+d.getSeconds()):d.getSeconds());
  }
  duraTime(time){
    if(time){
      return Number(time).toFixed(2);
    }
  }
/*  handling(item){
    this.warnService.handlingWarn(item.alarmId,this.appId)
      .subscribe(result=>{
        this.session();
        if(this.warnRlue=='全部'){
          if(this.pageNow){
            if(this.taskId>0){
              this.searchWarn(this.appId,this.taskId,this.warnTask,-1,this.warnStatus,this.pageNow-1,this.pageChange,null,null);
            }else{
              this.searchWarn(this.appId,0,this.warnTask,-1,this.warnStatus,this.pageNow-1,this.pageChange,null,null);
            }
          }else{
            if(this.taskId>0){
              this.searchWarn(this.appId,this.taskId,this.warnTask,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
            }else{
              this.searchWarn(this.appId,0,this.warnTask,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
            }
          }
        }else{
          this.validation();
          if(this.pageNow){
            if(this.taskId>0){
              this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,null,null);
            }else{
              this.searchWarn(this.appId,0,this.warnTask,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,null,null);
            }
          }else{
            if(this.taskId>0){
              this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
            }else{
              this.searchWarn(this.appId,0,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
            }
          }
        }
      })
  }*/
  deleteChange(event){
    this.deleteIndex = event;
  }
  lookHandling(item){
    item.alarmStatus = '已处理';
  }
  getWarnList(result){
    this.allWarn = result.content;
    //console.log(this.allWarn);
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
        //console.log(this.allWarn[i]);
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
    //console.log(this.alarmIds.substring(0,this.alarmIds.length-1));
    //console.log(this.sourcePaths.substring(0,this.sourcePaths.length-1));
    this.warnService.alarmExport(this.appId,this.appCate,this.alarmIds.substring(0,this.alarmIds.length-1),this.sourcePaths.substring(0,this.sourcePaths.length-1))
      .subscribe(result=>{
        //console.log(result.text());
        let url = decodeURIComponent(result.text());
        //console.log(SERVER_URL+"/"+url);
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
      //console.log(this.warnRlueArr[i].ruleName);
      if(this.warnRlueArr[i].ruleName == this.warnRlue){
        this.ruleId = this.warnRlueArr[i].ruleId;
        this.sessionRules = this.warnRlueArr[i].ruleName;
      }
    }
  }
  dateCompare(startStr,endStr){
      var d1, d2, s, arr, arr1, arr2;
      if (startStr.length > 10) {
        arr = startStr.split(" ");
        arr1 = arr[0].split("-");
        arr2 = arr[1].split(":");
        d1 = new Date(arr1[0], arr1[1] - 1, arr1[2], arr2[0], arr2[1], arr2[2]);
      } else {
        arr = startStr.split("-");
        d1 = new Date(arr[0], arr[1], arr[2]);
      }
      if (endStr.length > 10) {
        arr = endStr.split(" ");
        arr1 = arr[0].split("-");
        arr2 = arr[1].split(":");
        d2 = new Date(arr1[0], arr1[1] - 1, arr1[2], arr2[0], arr2[1], arr2[2]);
      } else {
        arr = endStr.split("-");
        d2 = new Date(arr[0], arr[1], arr[2]);
      }
      s = d2 - d1 ;
      if(s < 0) {
        return false;
      }else{
        if(Math.abs(d1-d2)/3600000<=6){
            return true;
        }else{
          return false;
        }
      }
}
  select_start(){
   // setTimeout(()=>{
    $("#start").addEventListener("input",function(){
      console.log(123);
    });
    //},1000)
/*    setTimeout(()=>{
     let start = $('#start').val();
     let end = $('#end').val();
     if(end!=''){
     this.judgePeriod(start,end);
     }
     },1000)*/

  }
  select(){
    console.log(123);
  }
  searchPeriod(id,taskId,nameTask,ruleId,status,page,size,start,end){
    if(this.appCate=='实时流分析'){
      this.warnService.searchTime(id,nameTask,ruleId,status,page,size,start,end)
        .subscribe(
          (result)=>{
          console.log(result);
          //this.getWarnList(result);
        },
          (error)=>{
            console.log(error.status);
          }
        )
    }else{
      this.warnService.searchOffTime(id,taskId,nameTask,ruleId,status,page,size,start,end)
        .subscribe(result=>{
          //this.getWarnList(result);
        })
    }
  }
  select_end(){
    setTimeout(()=>{
      let start = $('#start').val();
      let end = $('#end').val();
      if(start!=''){
        this.judgePeriod(start,end);
      }
    },1000)
  }
  judgePeriod(start,end){
    if(this.dateCompare(start,end)){
      this.validation();
      if(this.appCate=='实时流分析'){
        sessionStorage.setItem("name" , this.chanName);
        this.sessionSet();
        start = start+" 000";
        end = end+" 000";
        if(this.taskId>0){
          this.searchPeriod(this.appId,this.taskId,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
        }else{
          this.searchPeriod(this.appId,0,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
        }
      }else{
        sessionStorage.setItem("task" , this.warnTask);
        this.sessionSet();
        if(this.taskId>0){
          this.searchPeriod(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
        }else{
          this.searchPeriod(this.appId,0,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
        }
      }
    }else{
      alert("起始时间大于结束时间/起始时间和结束时间相差大于6小时！");
      return false
    }
  }
  search(){
    this.validation();
    let startTime;
    let endTime;
    if(this.startTime==''){
      startTime=null;
    }else{
      startTime=this.startTime;
    }
    if(this.endTime==''){
      endTime=null;
    }else{
      endTime=this.endTime;
    }
    this.distinguish(startTime,endTime);
  }
  distinguish(startTime,endTime){
    if(this.appCate=='实时流分析'){
      sessionStorage.setItem("name" , this.chanName);
      this.sessionSet();
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }else{
        this.searchWarn(this.appId,0,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }
    }else{
      sessionStorage.setItem("task" , this.warnTask);
      this.sessionSet();
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }else{
        this.searchWarn(this.appId,0,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }
    }
  }
  searchWarn(id,taskId,nameTask,ruleId,status,page,size,start,end){
    if(this.appCate=='实时流分析'){
      this.warnService.searchWarns(id,nameTask,ruleId,status,page,size,start,end)
        .subscribe(result=>{
          this.getWarnList(result);
        })
    }else{
      this.warnService.searchOffWarns(id,taskId,nameTask,ruleId,status,page,size,start,end)
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
    if(this.pageNow){
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,'全部',-1,'全部',this.pageNow-1,this.pageChange,null,null);
      }else{
        this.searchWarn(this.appId,0,'全部',-1,'全部',this.pageNow-1,this.pageChange,null,null);
      }
    }else{
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,'全部',-1,'全部',this.page-1,this.pageMaxItem,null,null);
      }else{
        this.searchWarn(this.appId,0,'全部',-1,'全部',this.page-1,this.pageMaxItem,null,null);
      }
    }
  }
}
