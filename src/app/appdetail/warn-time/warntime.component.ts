import {Component, ViewChild} from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SERVER_URL} from "../../app.constants";
import {calc_height} from "app/common/ts/calc_height";
import {isNullOrUndefined} from "util";
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
  chanNameArr:any[]=[];
  warnRlueArr:any[]=[];
  appId:string;
  warnRlue1:string;
  chanName1:string;
  warnStatus:string;
  pageParams = new Page();
  page: number = 0;
  pageMaxItem: number = 10;
  pageNow:number;
  startTime:string;
  endTime:string;
  statusArr:any[]=["全部","已处理","未处理"];
  ruleId:number;
  appCate:string;
  warnTask1:string;
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
  start1:string;
  end1:string;
  taskId:number=0;
  periodTime:string;
  periodTimeArr:any[]=[];
  saveTime:any[]=[];
  showTime:boolean = true;
  videoUrl:string='';
  playStart:string='';
  playEnd:string='';
  @ViewChild('offlinePeriodVideo') offlinePeriodVideo: any;
  myVideo:any;
  _endTime:string='';
  currentTime:string='';
  all_time_date:any[]=[];
  startHour:string="";
  startMinute:string="";
  startSecond:string="";
  endHour:string="";
  endMinute:string="";
  endSecond:string="";
  offline_startTime:string="";
  offline_endTime:string="";
  startHourMax:any[]=[];
  startMinuteMax:any[]=[];
  startSecondMax:any[]=[];
  endHourMax:any[]=[];
  endMinuteMax:any[]=[];
  endSecondMax:any[]=[];
  currentTask:any={}
  currentRule:any={ruleId:0, ruleName:''};
  endArr:any[]=[];
  constructor(private warnService: WarnService,private offlineService: OfflineService , private route: ActivatedRoute , private router: Router){
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    if(this.appCate=="实时流分析"){
      this.interval = setInterval(() => {
        if(sessionStorage.getItem("name")){
          this.chanName1 = sessionStorage.getItem("name");
        }
        this.session();
        this.getRuleId();
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.chanName1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }else{
            this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }
      }, 15000);
    }else{
      this.interval = setInterval(() => {
        if(sessionStorage.getItem("task")){
          this.warnTask1 = sessionStorage.getItem("task");
        }
        this.session();
        this.getRuleId();
        this.getTaskId();
        this.searchWarn(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,this.getPeriodTime()[0],this.getPeriodTime()[1]);
      }, 360000);
    }
    if(this.appCate=="实时流分析"){
      this.warnService.getWarnRules(this.appId)
        .subscribe(result=>{
          this.warnRlueArr = result.content;
          if(this.warnRlueArr.length>0){
            let tempArr:any[]=[];
            for(let i=0;i<this.warnRlueArr.length;i++){
              if(this.warnRlueArr[i].targetImages!=''&&this.warnRlueArr[i].recognitionCategory.name!="全部"){
                  tempArr.push(this.warnRlueArr[i]);
              }
            }
            this.warnRlueArr = tempArr;
            if(this.warnRlueArr.length == 0) {
              clearInterval(this.interval);
              return;
            }
            this.warnRlue1 = this.warnRlueArr[0].ruleName;
            this.ruleId = this.warnRlueArr[0].ruleId;
          }
          this.warnService.getChanName(this.appId)
            .subscribe(result=>{
              this.chanNameArr = isNullOrUndefined(result.list) ? null : result.list;
              this.chanName1 = isNullOrUndefined(result.latestChannel) ? this.chanNameArr[0] : result.latestChannel;
              this.currentRule = isNullOrUndefined(result.latestRule) ? this.currentRule : result.latestRule;
              this.warnRlue1 = this.currentRule.ruleName;
              this.ruleId = this.currentRule.ruleId;
              this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,null,null);
            });
        });
    }else{
      for(let n:any=0;n<60;n++){
        if(n<10){
          n = "0"+n;
        }
        this.all_time_date.push(String(n));
      }
      this.warnService.getWarnTaskWithTargetFeature(this.appId)
        .subscribe(result=>{
          this.warnTaskArr = isNullOrUndefined(result.list) ? null : result.list;
          if(this.warnTaskArr.length>0){
            this.currentTask = isNullOrUndefined(result.latestTask) ? this.warnTaskArr[0] : result.latestTask;
            this.warnTask1 = this.currentTask.taskName;
            this.videoUrl = this.currentTask.outputPath;
            this.taskId = this.currentTask.taskId;

            if(this.currentTask.alarmRules.length > 0){
              this.warnRlueArr = this.currentTask.alarmRules;
              this.warnRlue1 = isNullOrUndefined(result.latestRule) ? this.warnRlueArr[0].ruleName : result.latestRule.ruleName;
              this.ruleId = isNullOrUndefined(result.latestRule) ? this.warnRlueArr[0].ruleId : result.latestRule.ruleId;
            }

            this.offlineService.getOfflineVideoTime(this.taskId)
              .subscribe((result)=>{
                  let startArr:any[] = result.start.split(".")[0].split(":");
                  let endArr:any[] = result.end.split(".")[0].split(":");
                  this.endArr = endArr;
                  this.startHour = startArr[0];
                  this.startMinute = startArr[1];
                  this.startSecond = startArr[2];
                  this.endHour = endArr[0];
                  this.endMinute = endArr[1];
                  this.endSecond = endArr[2];
                  this.endHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
                  this.endMinuteMax = this.all_time_date.slice(0,this.getMaxTime(endArr[1]));
                  this.endSecondMax = this.all_time_date.slice(0,this.getMaxTime(endArr[2]));
                  if(Number(this.endHour)==0&&Number(this.endMinute)==0&&Number(this.endSecond)>=0){
                    this.setStartTimeMax(endArr,this.startHour,this.startMinute,this.startSecond,'start');
                  }else if(Number(this.endHour)==0&&Number(this.endMinute)>=0){
                    if(Number(this.startMinute)==0){
                      this.startHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
                      this.startMinuteMax = this.all_time_date.slice(0,this.getMaxTime(endArr[1]));
                      this.startSecondMax = this.all_time_date;
                    }else{
                      this.setStartTimeMax(endArr,this.startHour,this.startMinute,this.startSecond,'start');
                    }
                  }else if(Number(this.endHour)>0){
                      if(Number(this.startHour)==0&&Number(this.startMinute)==0){
                        this.startHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
                        this.startMinuteMax = this.all_time_date.slice(0,this.getMaxTime(endArr[1]));
                        this.startSecondMax = this.all_time_date;
                      }else if(Number(this.startHour)==0&&Number(this.startMinute)>0){
                        this.startHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
                        this.startMinuteMax = this.all_time_date;
                        this.startSecondMax = this.all_time_date;
                      }else if(Number(this.startHour)>0){
                        this.setStartTimeMax(endArr,this.startHour,this.startMinute,this.startSecond,'start');
                      }
                  }
                  this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem, null, null);
                  this.searchPeriod(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem, null, null);
                });
          };
        });
    }
    this.warnStatus = this.statusArr[0];
  }
  setStartTimeMax(endArr,hour?,minute?,second?,type?){
    hour = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
    minute = this.all_time_date.slice(0,this.getMaxTime(endArr[1]));
    second = this.all_time_date.slice(0,this.getMaxTime(endArr[2]));
    if(type=='start'){
      this.startHourMax = hour;
      this.startMinuteMax = minute;
      this.startSecondMax = second;
    }else{
      this.endHourMax = hour;
      this.endMinuteMax = minute;
      this.endSecondMax = second;
    }
  }
  getMaxTime(data){
    for(let i=0;i<this.all_time_date.length;i++){
      if(this.all_time_date[i]==data){
        return i+1;
      }
    }
  }
  getTaskId(){
    for(let i=0;i<this.warnTaskArr.length;i++){
      if(this.warnTaskArr[i].taskName==this.warnTask1){
        this.taskId = this.warnTaskArr[i].taskId;
        break
      }
    }
  }
  getRuleId(){
    if(this.warnRlue1==''){
      this.ruleId = 0;
    }else{
      for(let i=0;i<this.warnRlueArr.length;i++){
        if(this.warnRlueArr[i].ruleName == this.warnRlue1){
          this.ruleId = this.warnRlueArr[i].ruleId;
        }
      }
    }
  }

  handleOfflineTime(){
    let startTime;
    let endTime;
    let arr:any[]=[];
    if(this.startHour=='00'&&this.startMinute=='00'&&this.startSecond=='00'){
      startTime="00:00:00 000";
    }else{
      startTime=this.startHour+":"+this.startMinute+":"+this.startSecond+" 000";
    }
    if(this.endHour=='00'&&this.endMinute=='00'&&this.endSecond=='00'){
      endTime="00:00:00 000";
    }else{
      endTime=this.endHour+":"+this.endMinute+":"+this.endSecond+" 000";
    }
    arr.push(startTime);
    arr.push(endTime);
    return arr
  }
  filterUrl(url?){
    return isNullOrUndefined(url) ? "" : url.substring(17);
  }
  changeWarnTask(){
    for(let i = 0; i < this.warnTaskArr.length; i++){
      if(this.warnTaskArr[i].taskName == this.warnTask1){
        this.currentTask = this.warnTaskArr[i];
        break;
      }
    }
    this.showTime = this.currentTask.fileType != 'image';
    this.videoUrl = this.currentTask.outputPath != null ? this.currentTask.outputPath : '';
    this.warnRlueArr = this.currentTask.alarmRules;
    if (this.warnRlueArr.length > 0) {
      this.warnRlue1 = this.warnRlueArr[0].ruleName;
      this.ruleId = this.warnRlueArr[0].ruleId;
    } else {
      this.warnRlue1 = '';
      this.ruleId = 0;
    }
    this.taskId = this.currentTask.taskId;
    this.offlineService.getOfflineVideoTime(this.taskId)
      .subscribe(
        (result)=> {
          let startArr:any[] = result.start.split(".")[0].split(":");
          let endArr:any[] = result.end.split(".")[0].split(":");
          this.startHour = startArr[0];
          this.startMinute = startArr[1];
          this.startSecond = startArr[2];
          this.endHour = endArr[0];
          this.endMinute = endArr[1];
          this.endSecond = endArr[2];
          this.searchPeriod(this.appId, this.taskId, this.warnTask1, this.ruleId, this.warnStatus, this.page, this.pageMaxItem, null, null);
        });
    this.sessionSet();
  }
  getPeriodTime(){
    this.saveTime=[];
    let start:string='';
    let end:string='';
    if(this.periodTime!=undefined&&this.periodTime.length>0){
      let periodTime = this.periodTime.split("-");
      start = periodTime[0];
      end = periodTime[1];
      start = start.replace(/\//g,"-");
      end = end.replace(/\//g,"-");
      this.saveTime.push(start);
      this.saveTime.push(end);
      return this.saveTime
    }else{
      start = null;
      end=null;
      this.saveTime.push(start);
      this.saveTime.push(end);
      return this.saveTime
    }
  }
  videoPause() {
    this.myVideo = this.offlinePeriodVideo.nativeElement;
    this.currentTime = this.myVideo.currentTime+"";
    //console.log(this.currentTime);
    let start:number;
    let end:number;
    parseFloat(this.currentTime);
    start = parseFloat(this.currentTime)-0.05;
    end = parseFloat(this.currentTime)+0.05;
    this.searchWarn(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,this.changeTime(start),this.changeTime(end));
  }
  changeTime(start){
    let hour:number;
    let minute:number;
    let second:number;
    if(Math.floor(start)>3600){
      hour = Math.floor(start/3600);
      minute = Math.floor((start%3600)/60);
      second = (start%3600)%60;
      return this.mergeTime(start,hour,minute,second)
    }else if(Math.floor(start)>60){
      hour = 0;
      minute = Math.floor(start/60);
      second = Math.floor(start%60);
      return this.mergeTime(start,hour,minute,second)
    }else if(Math.floor(start)>0){
      hour = 0;
      minute = 0;
      second = Math.floor(start);
      return this.mergeTime(start,hour,minute,second)
    }else{
      hour = 0;
      minute = 0;
      second = 0;
      return this.mergeTime(start,hour,minute,second)
    }
  }
  mergeTime(start,hour,minute,second){
    let time:string='';
    hour>10?String(hour):("0"+hour);
    minute>10?String(minute):("0"+minute);
    second>10?String(second):("0"+second);
    time = hour+":"+minute+":"+second+" "+String(start).split(".")[1].substring(0,3);
    return time
  }
  ngAfterViewInit(){
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  session(){
    if(sessionStorage.getItem("rule")){
      this.warnRlue1 = sessionStorage.getItem("rule");
    }
    if(sessionStorage.getItem("status")){
      this.warnStatus = sessionStorage.getItem("status");
    }
    if(this.appCate=="实时流分析"){
      if(sessionStorage.getItem("start1")){
        $('#start1').val(sessionStorage.getItem("start1"));
      }
      if(sessionStorage.getItem("end1")){
        $('#end1').val(sessionStorage.getItem("end1"));
      }
    }else{
      if(sessionStorage.getItem("start1")){
        this.startHour = sessionStorage.getItem("start1").split(":")[0];
        this.startMinute = sessionStorage.getItem("start1").split(":")[1];
        this.startSecond = sessionStorage.getItem("start1").split(":")[2].split(" ")[0];
      }
      if(sessionStorage.getItem("end1")){
        this.endHour = sessionStorage.getItem("end1").split(":")[0];
        this.endMinute = sessionStorage.getItem("end1").split(":")[1];
        this.endSecond = sessionStorage.getItem("end1").split(":")[2].split(" ")[0];
      }
    }
    if(sessionStorage.getItem("periodTime")){
      this.periodTime = sessionStorage.getItem("periodTime");
    }
    if(sessionStorage.getItem("periodTimeArr")){
      this.periodTimeArr = sessionStorage.getItem("periodTimeArr").split(",");
    }
  }
  offlinTimeControl(endArr,hour,minute,second,type){
    if(Number(endArr[0])==0&&Number(endArr[1])==0&&Number(endArr[2])>=0){
      this.setStartTimeMax(endArr,hour,minute,second,type);
    }else if(Number(endArr[0])==0&&Number(endArr[1])>=0){
      if(Number(minute)==0){
        if(type=='start'){
          this.startHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
          this.startMinuteMax = this.all_time_date.slice(0,this.getMaxTime(endArr[1]));
          this.startSecondMax = this.all_time_date;
        }else{
          this.endHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
          this.endMinuteMax = this.all_time_date.slice(0,this.getMaxTime(endArr[1]));
          this.endSecondMax = this.all_time_date;
        }

      }else{
        this.setStartTimeMax(endArr,hour,minute,second,type);
      }
    }else if(Number(endArr[0])>0){
      if(Number(hour)==0&&Number(minute)==0){
        if(type=='start'){
          this.startHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
          this.startMinuteMax = this.all_time_date.slice(0,this.getMaxTime(endArr[1]));
          this.startSecondMax = this.all_time_date;
        }else{
          this.endHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
          this.endMinuteMax = this.all_time_date.slice(0,this.getMaxTime(endArr[1]));
          this.endSecondMax = this.all_time_date;
        }
      }else if(Number(hour)==0&&Number(minute)>0){
        if(type=='start'){
          this.startHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
          this.startMinuteMax = this.all_time_date;
          this.startSecondMax = this.all_time_date;
        }else{
          this.endHourMax = this.all_time_date.slice(0,this.getMaxTime(endArr[0]));
          this.endMinuteMax = this.all_time_date;
          this.endSecondMax = this.all_time_date;
        }
      }else if(Number(hour)>0){
        this.setStartTimeMax(endArr,hour,minute,second,type);
      }
    }
  }
  changeOfflineTime(){
    this.getTaskId();
    this.getRuleId();
    this.offlinTimeControl(this.endArr,this.startHour,this.startMinute,this.startSecond,'start');
    this.offlinTimeControl(this.endArr,this.endHour,this.endMinute,this.endSecond,'end');
    if(Number(this.startHour)>Number(this.endHour)){
      this.timeTip();
      return false
    }else if((Number(this.startHour)==0&&Number(this.endHour)==0)&&(Number(this.startMinute)>Number(this.endMinute))){
      this.timeTip();
      return false
    }else if((Number(this.startHour)==0&&Number(this.endHour)==0)&&(Number(this.startMinute)==0&&Number(this.endMinute)==0)&&(Number(this.startSecond)>Number(this.endSecond))){
      this.timeTip();
      return false
    }else{
      this.searchPeriod(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,this.handleOfflineTime()[0],this.handleOfflineTime()[1]);
    }
  }
  timeTip(){
    this.deleteIndex = 1;
    this.tip_title = "提示";
    this.tip_content = "起始时间大于结束时间！";
  }
  ngOnDestroy(){
    clearInterval(this.interval);
    if(sessionStorage.getItem("periodTimeArr")){
      sessionStorage.removeItem("periodTimeArr");
    };
    if(sessionStorage.getItem("periodTime")){
      sessionStorage.removeItem("periodTime");
    };
    if(sessionStorage.getItem("start1")){
      sessionStorage.removeItem("start1");
    };
    if(sessionStorage.getItem("end1")){
      sessionStorage.removeItem("end1");
    };
    if(sessionStorage.getItem("rule")) {
      sessionStorage.removeItem('rule');
    };
    if(sessionStorage.getItem("name")) {
      sessionStorage.removeItem('name');
    };
    if(sessionStorage.getItem("taskId")) {
      sessionStorage.removeItem('taskId');
    };
    if(sessionStorage.getItem("taskName")) {
      sessionStorage.removeItem('taskName');
    };
  }
  getHeight(){
    let height = window.innerHeight-140;
    return{
      "height":height+'px'
    }
  }
  ngOnInit() {
    calc_height(document.getElementById('warn-content'));
    this.route.params.subscribe((param) => {
      if(JSON.stringify(param) != "{}"){
        this.warnStatus = param['status'];
        this.getRuleId();
        $("#start1").val('');
        $("#end1").val('');
        if(this.appCate=='实时流分析'){
          this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,null,null);
        }else{
          this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,null,null);
        }
      }
    });
    this.route.queryParams.subscribe(params => {
      if(JSON.stringify(params) != "{}"&& !params.pageNo){
        this.taskName = params['taskName'];
        this.taskId = params['taskId'];
        this.getRuleId();
        this.warnService.searchOffWarns(this.appId,this.taskId,this.taskName,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,null,null)
          .subscribe(result=>{
            this.warnTask1 = this.taskName;
            this.getWarnList(result);
          })
      }
    });
      $("#start1").jeDate({
        isinitVal:true,
        festival: false,
        format: 'YYYY-MM-DD hh:mm:ss',
        choosefun: function(val){
          let end = $('#end1').val();
          if(end!=''){
            this.judgePeriod(val[0].value,end);
          }
        }.bind(this),
        okfun:function(val){
          let end = $('#end1').val();
          if(end!=''){
            this.judgePeriod(val[0].value,end);
          }
        }.bind(this)
      });
      $("#end1").jeDate({
        isinitVal:true,
        festival: false,
        format: 'YYYY-MM-DD hh:mm:ss',
        choosefun: function(val){
          let start1 = $('#start1').val();
          if(start1!=''){
            this.judgePeriod(start1,val[0].value);
          }
        }.bind(this),
        okfun:function(val){
          let start1 = $('#start1').val();
          if(start1!=''){
            this.judgePeriod(start1,val[0].value);
          }
        }.bind(this)
      });
      console.log($('#start1'));
    this.startTime = $('#start1').val("");
    this.endTime = $('#end1').val("");
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
    this.lookIndex=1;
    this.detaillist = item;
  }
  thumbnail(){
    this.seeIndex = 2;
  }
  seePhoto(url){
    this.seeIndex = 1;
    this.imageUrl = url.slice(17);
  }
  slicePath(url){
    return url.slice(17);
  }
  downPhoto(url){
    this.downUrl = url;
    document.getElementById('down').click();
  }
  getDownPath(url){
    return url.slice(17);
  }
  close(){
    this.seeIndex = 0;
    $("#img").remove();
  }
  getPageData(paraParam){
    if(this.appCate=="实时流分析"){
      this.startTime = $('#start1').val();
      this.endTime = $('#end1').val();
      this.validation();
      this.sessionSet();
      this.session();
      this.judgeTime();
      if(this.warnRlue1=='全部'){
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.chanName1,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }else{
          this.searchWarn(this.appId,0,this.chanName1,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }
      }else{
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.chanName1,this.ruleId,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }else{
          this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }
      }
    }else{
      this.validation();
      this.sessionSet();
      this.session();
      this.searchWarn(this.appId,this.taskId,this.warnTask1,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.handleOfflineTime()[0],this.handleOfflineTime()[1]);
    }
    this.page=paraParam.curPage-1;
    this.pageMaxItem = Number(paraParam.pageMaxItem);
    //console.log(this.pageNow,Number(this.pageChange));
  }
  judgeTime(){
    if($('#start1').val()==''){
      this.start1 = null;
    }else{
      this.start1 = this.startTime+" 000";
    }
    if($('#end1').val()==''){
      this.end1 = null;
    }else{
      this.end1 = this.endTime+" 000";
    }
  }
  output(item){
    return item.substring(17);
  }
  deleteChange(event){
    this.deleteIndex = event;
  }
  getWarnList(result){
    this.allWarn = result.content;
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
    this.warnService.alarmExport(this.appId,this.appCate,this.alarmIds.substring(0,this.alarmIds.length-1),this.sourcePaths.substring(0,this.sourcePaths.length-1))
      .subscribe(result=>{
        let url = decodeURIComponent(result.text());
        window.open(SERVER_URL+"/"+url);
      })
  }
  sessionSet(){
    sessionStorage.setItem("status" , this.warnStatus);
    if(this.appCate=="实时流分析"){
      sessionStorage.setItem("rule" , this.sessionRules);
      sessionStorage.setItem("start" , this.startTime);
      sessionStorage.setItem("end" , this.endTime);
    }else{
      sessionStorage.setItem("rule" , this.warnRlue1);
      sessionStorage.setItem("start" , this.offline_startTime);
      sessionStorage.setItem("end" , this.offline_endTime);
    }
  }
  validation(){
    if(this.warnRlue1!=''&&this.warnRlue1!=undefined){
      for(let i=0;i<this.warnRlueArr.length;i++){
        if(this.warnRlueArr[i].ruleName == this.warnRlue1){
          this.ruleId = this.warnRlueArr[i].ruleId;
          this.sessionRules = this.warnRlueArr[i].ruleName;
        }
      }
    }else{
      this.ruleId = 0;
      this.sessionRules = '';
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
  searchPeriod(id,taskId,nameTask,ruleId,status,page,size,start,end){
    if(this.appCate=='实时流分析'){
      this.warnService.searchTime(id,nameTask,ruleId,status,page,100000,start,end)
        .subscribe(
          (result)=>{
            this.handleTime(result);
        },
          (error)=>{
            if(error.status==404){
              this.tipNoWarn();
            }
          }
        )
    }else{
      this.warnService.searchOffTime(id,taskId,nameTask,ruleId,status,page,100000,start,end)
        .subscribe((result)=>{
            this.handleTime(result)},
          (error)=>{
            if(error.status==404){
              this.tipNoWarn();
            }
          })
    }
  }
  tipNoWarn(){
    this.deleteIndex = 1;
    this.tip_title = "提示";
    this.tip_content = "该时间段没有告警！";
  }
  handleTime(result){
    this.periodTimeArr=[];
      for(var key in result) {
        let key1:string;
        let value:string;
        if (this.appCate == "实时流分析") {
          key1 = key.replace(/-/g, "/");
          value = result[key].replace(/-/g, "/");
        } else {
          key1 = this.getTime(key);
          value = this.getTime(result[key]);
        }
        let key_value = key1 + "-" + value;
        this.periodTimeArr.push(key_value);
      }
      if(this.periodTimeArr.length > 0)
        this.periodTime = this.periodTimeArr[0];
      if(this.periodTime!=''){
        this.playVideo(this.periodTime);
      }
  }
  playVideo(periodtime){
    periodtime.split('-');
    this.playStart = periodtime.split('-')[0];
    this.playEnd = periodtime.split('-')[1];
    this.myVideo = this.offlinePeriodVideo.nativeElement;
    this.myVideo.addEventListener("timeupdate",function(){
      var time = this.myVideo.currentTime+"";
      /*   document.getElementById("showTime").value=time;*/
      var ts = time.substring(0,time.indexOf("."));
      this._endTime = this._endTime.substring(0,time.indexOf("."));
      if(ts==this._endTime){
        this.myVideo.pause();
      }
    }.bind(this));
    this.playMedia(this.playStart,this.playEnd);
  }
  //视频播放
  playMedia(startTime,endTime){
  //设置结束时间
    this._endTime = this.cutTime(endTime);
    this.myVideo.currentTime = this.cutTime(startTime);
  //this.myVideo.play();
}
  cutTime(time){
    let noMillisecond = time.split(" ")[1];
    let millisecond = time.split(" ")[2];
    let hour = noMillisecond.split(":")[0];
    let minute = noMillisecond.split(":")[1];
    let second = noMillisecond.split(":")[2];
    //console.log(Number(hour));
    if(Number(hour)>0){
      console.log(Number(hour)*3600);
      hour = Number(hour)*3600;
    }else{
      hour = 0;
    }
    if(Number(minute)>0){
      minute = Number(minute)*60;
      //console.log(Number(minute)*60);
    }else{
      minute = 0;
    }
    return String(hour+minute+Number(second))+"."+millisecond;
  }
  changePeriodTime(){
      if(this.periodTime!=''){
        this.playVideo(this.periodTime);
      }
     sessionStorage.setItem("periodTime" , this.periodTime);
     sessionStorage.setItem("periodTimeArr" , this.periodTimeArr.join(','));
  }
  judgePeriod(start,end){
    if(this.appCate=='实时流分析'){
      //if(this.dateCompare(start,end)){
        this.validation();
          sessionStorage.setItem("name" , this.chanName1);
          this.sessionSet();
          start = start+" 000";
          end = end+" 000";
          if(this.taskId>0){
            this.searchPeriod(this.appId,this.taskId,this.chanName1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,start,end);
          }else{
            this.searchPeriod(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,start,end);
          }
      /*   }else{
        this.deleteIndex = 1;
        this.tip_title = "提示";
        this.tip_content = "起始时间大于结束时间/起始时间和结束时间相差大于6小时！";
        $("#start1").val('');
        $("#end1").val('');
        return false
      }*/
    }else{
      sessionStorage.setItem("task" , this.warnTask1);
      this.sessionSet();
      start = start+" 000";
      end = end+" 000";
      if(this.taskId>0){
        this.searchPeriod(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,start,end);
      }else{
        this.searchPeriod(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,start,end);
      }
    }
  }
  search(){
    this.pageNow = 0;
    this.validation();
    let startTime;
    let endTime;
    if(this.periodTime!=undefined&&this.periodTime.length>0){
      let periodTime = this.periodTime.split("-");
      if(this.appCate=="实时流分析"){
        startTime = periodTime[0];
        endTime = periodTime[1];
        startTime = startTime.replace(/\//g,"-");
        endTime = endTime.replace(/\//g,"-");
      }else{
        startTime = periodTime[0];
        endTime = periodTime[1];
      }
     }else{
      startTime = null;
      endTime=null;
    }
    this.distinguish(startTime,endTime);
  }
  distinguish(startTime,endTime){
    if(this.appCate=='实时流分析'){
      sessionStorage.setItem("name" , this.chanName1);
      this.sessionSet();
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,this.chanName1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,startTime,endTime);
      }else{
        this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,startTime,endTime);
      }
    }else{
      sessionStorage.setItem("task" , this.warnTask1);
      this.sessionSet();
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,startTime,endTime);
      }else{
        this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page,this.pageMaxItem,startTime,endTime);
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
  getTime(item?){
    if(item){
      let re = item.split('-');
      return re[2].substring(2);
    }
  }
  backWarn(obj){
    this.session();
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,obj,this.ruleId,'全部',this.page,this.pageMaxItem,null,null);
      }else{
        this.searchWarn(this.appId,0,obj,this.ruleId,'全部',this.page,this.pageMaxItem,null,null);
    }
  }
  cancel(){
    this.lookIndex = 0;
    this.search();
    /*if(this.appCate=="实时流分析"){
        this.backWarn(this.chanName1);
    }else{
      this.backWarn(this.warnTask1);
    }*/
  }
  getMaxHeight(){
    if($("#img").length>0){
      return
    }else{
      let imgObj = new Image();
      imgObj.src = $("#image").attr("src");
      imgObj.id = "img";
      $(".showImage").append(imgObj);
      console.log($("#img").width());
      imgObj.addEventListener("load",this.getWH);
      $("#img").css("display","none");
    }
  }
  getWH(){
    let obj:any;
    obj = document.getElementById("image");
    obj.className = "";
    let width = $("#img").width();
    let height = $("#img").height();
    let x = (970-parseInt(width))/2;
    let y = (545-parseInt(height))/2;
    if(parseInt(width)>parseInt(height)){
      if(parseInt(width)>=970){
        obj.style.width = "970px";
        obj.style.position = "absolute";
        obj.style.height = parseInt(height)*970/parseInt(width)+"px";
        obj.style.left = "0";
        obj.style.right = "0";
        obj.style.top = "50%";
        obj.style.marginTop = -(obj.offsetHeight/2)+'px';
        let y1 = (545-parseInt(obj.offsetHeight))/2;
        $(".closeImage").css("right","-17px");
        $(".closeImage").css("top",y1-17+'px');
        return
      }else{
        obj.className = "show-img";
        obj.style.position = "absolute";
        obj.style.width = width+"px";
        obj.style.height = height+"px";
        obj.style.top = "50%";
        obj.style.left = "50%";
        obj.style.marginTop = -(height/2)+'px';
        obj.style.marginLeft = -(width/2)+'px';
        $(".closeImage").css("right",x-17+'px');
        $(".closeImage").css("top",y-17+'px');
        return
      }
    }else if(parseInt(width)<=parseInt(height)){
      if(parseInt(height)>=545){
        obj.style.width = parseInt(width)*545/parseInt(height)+"px";
        obj.style.height = "545px";
        obj.style.position = "relative";
        obj.style.top = "0";
        obj.style.bottom = "0";
        obj.style.left = "50%";
        obj.style.marginLeft = -(obj.offsetWidth/2)+'px';
        let x1 = (970-parseInt(obj.offsetWidth))/2;
        $(".closeImage").css("right",x1-17+'px');
        $(".closeImage").css("top","-17px");
        return
      }else{
        obj.className = "show-img";
        obj.style.position = "absolute";
        obj.style.width = width+"px";
        obj.style.height = height+"px";
        obj.style.top = "50%";
        obj.style.left = "50%";
        obj.style.marginTop = -(height/2)+'px';
        obj.style.marginLeft = -(width/2)+'px';
        $(".closeImage").css("right",x-17+'px');
        $(".closeImage").css("top",y-17+'px');
        return
      }
    }
  }

  downloadFile(item) {
    let path = item.imagePath;
    this.warnService.downloadFile(path).subscribe(data => {
      if(item.frameNo == 'null' || item.frameNo == null){
        var frameNo:number = Math.floor(Math.random() * 1000) + 9000;
      }else {
        var frameNo:number = item.frameNo;
      }
      var name = this.getDateFormat() + frameNo;
      for(var i = 0 ; i < (isNullOrUndefined(item.alarmRules) ? 0 : item.alarmRules.length); i++){
        name += item.alarmRules[i].recognitionCategory.name;
        if(i < item.alarmRules.length - 1) name += '-';
      }
      var tempPathArr = path.split(".");
      var suffix = tempPathArr[tempPathArr.length - 1];
      name = name + "." + suffix;
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.download = name;
      a.href  = URL.createObjectURL(data.blob());
      a.click();
      a.remove()
    });
  }

  getDateFormat = () => {
    let date = new Date();
    let dateStr = date.getFullYear() + "" + this.leftPad0((date.getMonth() + 1), 2) + "" + this.leftPad0(date.getDate(), 2);
    dateStr = dateStr + this.leftPad0(date.getHours(), 2) + this.leftPad0(date.getMinutes(), 2) + this.leftPad0(date.getSeconds(), 2);
    return dateStr;
  }

  leftPad0 = (str, num) => {
    str = "" + str;
    if(str.length >=num) return str;
    for(let i = 0; i< num-str.length; i++){
      str = "0" + str;
    }
    return str;
  }
}
