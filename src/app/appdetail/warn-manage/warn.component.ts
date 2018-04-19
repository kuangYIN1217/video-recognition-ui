import { Component, OnInit} from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SERVER_URL} from "../../app.constants";
import {calc_height} from "app/common/ts/calc_height";
import {buffer} from "rxjs/operators";
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
  taskId:number=0;
  showTime:boolean = true;
  once:string='';
  alarmRules:any[]=[];
  alarmsId:any[]=[];
  init:boolean = false;
  fileType:string="";
  all_time_date:any[]=[];
  startHour:string="";
  startMinute:string="";
  startSecond:string="";
  endHour:string="";
  endMinute:string="";
  endSecond:string="";
  offline_startTime:string="";
  offline_endTime:string="";
  constructor(private warnService: WarnService,private offlineService: OfflineService , private route: ActivatedRoute , private router: Router) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    if(this.appCate=="实时流分析"){
      this.interval = setInterval(() => {
        if(sessionStorage.getItem("name")){
          this.chanName = sessionStorage.getItem("name");
        }
        this.session();
        this.getRuleId();
        let start = $("#start").val();
        let end = $("#end").val();
        if(start==""){
          start = null;
        }else{
          start = start+" 000";
        };
        if(end==""){
          end = null;
        }else{
          end = end+" 000";
        };
        if(this.pageNow){
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.chanName,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,start,end);
          }else{
            this.searchWarn(this.appId,0,this.chanName,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,start,end);
          }
        }else{
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
          }else{
            this.searchWarn(this.appId,0,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
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
        this.getTaskId();
        if(this.pageNow){
          this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,this.handleOfflineTime()[0],this.handleOfflineTime()[1]);
        }else{
          this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.handleOfflineTime()[0],this.handleOfflineTime()[1]);
        }
      }, 360000);
    }
    if(this.appCate=="实时流分析"){
      this.warnService.getWarnRules(this.appId)
        .subscribe(result=>{
          this.warnRlueArr = result.content;
          this.warnRlueArr.unshift({"ruleId":-1,"ruleName":'全部'});
          //console.log(this.warnRlueArr);
          if(this.warnRlueArr.length>0){
            this.warnRlue = this.warnRlueArr[0].ruleName;
            this.ruleId = this.warnRlueArr[0].ruleId;
          }
        });
      this.warnService.getChanName(this.appId)
        .subscribe(result=>{
          this.chanNameArr=result;
          //console.log(this.chanNameArr);
          this.chanNameArr.unshift('全部');
          this.chanName = this.chanNameArr[0];
        });
    }else{
      for(let n:any=0;n<60;n++){
        if(n<10){
          n = "0"+n;
        }
        this.all_time_date.push(String(n));
      }
      this.warnService.getWarnTask(this.appId,"all")
        .subscribe(result=>{
          this.warnTaskArr = result;
          //console.log(this.warnTaskArr);
          if(this.warnTaskArr.length>0&&this.once!="true"){
            this.warnTask = this.warnTaskArr[0].taskName;
            this.taskId = this.warnTaskArr[0].taskId;
            this.getVideoTime();
          }else{
            for(let i=0;i<this.warnTaskArr.length;i++){
                if(this.warnTaskArr[i].taskId==this.taskId){
                  this.warnRlueArr = this.warnTaskArr[i].alarmRules;
                  break;
                }
            }
            this.warnRlue = this.alarmRules[0].ruleName;
            this.ruleId = this.alarmRules[0].ruleId;
          };
          if(!this.fileType){
            if(this.warnTaskArr[0].fileType=='image'||this.warnTaskArr[0].fileType=='zip'){
              this.showTime = false;
            }else{
              this.showTime = true;
            }
          }
        });
    }
    this.warnStatus = this.statusArr[0];
    if(this.appCate=="实时流分析"){
      if(this.taskId<=0){
        this.searchWarn(this.appId,0,'全部',-1,'全部',this.page-1,this.pageMaxItem,null,null);
      }
    }
  }
  getVideoTime(){
    this.offlineService.getOfflineVideoTime(this.taskId)
      .subscribe((result)=>{
          this.removeMillisecond(result.start);
          this.startHour = this.removeMillisecond(result.start)[0];
          this.startMinute = this.removeMillisecond(result.start)[1];
          this.startSecond = this.removeMillisecond(result.start)[2];
          this.endHour = this.removeMillisecond(result.end)[0];
          this.endMinute = this.removeMillisecond(result.end)[1];
          this.endSecond = this.removeMillisecond(result.end)[2];
          this.initRule();
        },
        (error)=>{
          if(error.status==400){
            this.initTime();
          }
        });
  }
  initRule(){
    if(this.warnTaskArr[0].alarmRules.length>0){
      this.warnRlueArr = this.warnTaskArr[0].alarmRules;
      this.warnRlue = this.warnTaskArr[0].alarmRules[0].ruleName;
      this.ruleId = this.warnTaskArr[0].alarmRules[0].ruleId;
    }
    if(this.once!="true"){
      this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.handleOfflineTime()[0],this.handleOfflineTime()[1]);
    }
  }
  initTime(){
    this.startHour = "00";
    this.startMinute = "00";
    this.startSecond = "00";
    this.endHour = "00";
    this.endMinute = "00";
    this.endSecond = "00";
  }
  getTaskId(){
    for(let i=0;i<this.warnTaskArr.length;i++){
      if(this.warnTaskArr[i].taskName==this.warnTask){
        this.taskId = this.warnTaskArr[i].taskId;
        break
      }
    }
  }
  removeMillisecond(time){
    let arr:any[]=time.split(".")[0].split(":");
    return arr
  }
  changeWarnTask(){
    for(let i=0;i<this.warnTaskArr.length;i++){
      if(this.warnTaskArr[i].taskName==this.warnTask){
        if(this.warnTaskArr[i].fileType=='image'||this.warnTaskArr[i].fileType=='zip'){
          this.showTime = false;
        }else{
          this.showTime = true;
        }
        this.warnRlueArr = this.warnTaskArr[i].alarmRules;
        this.warnRlue = this.warnTaskArr[i].alarmRules[0].ruleName;
        this.ruleId = this.warnTaskArr[i].alarmRules[0].ruleId;
        break;
      }
    }
  }
  ngAfterViewInit(){
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));

  }
  output(item){
    return item.substring(17);
  }
  handleOfflineTime(){
    let startTime;
    let endTime;
    let arr:any[]=[];
    if(this.startHour=='00'&&this.startMinute=='00'&&this.startSecond=='00'){
      startTime=null;
    }else{
      startTime=this.startHour+":"+this.startMinute+":"+this.startSecond+" 000";
    }
    if(this.endHour=='00'&&this.endMinute=='00'&&this.endSecond=='00'){
      endTime=null;
    }else{
      endTime=this.endHour+":"+this.endMinute+":"+this.endSecond+" 000";
    }
    arr.push(startTime);
    arr.push(endTime);
    return arr
  }
  session(){
    if(sessionStorage.getItem("rule")){
      this.warnRlue = sessionStorage.getItem("rule");
    }
    if(sessionStorage.getItem("status")){
      this.warnStatus = sessionStorage.getItem("status");
    }
    if(this.appCate=="实时流分析"){
      if(sessionStorage.getItem("start")){
        (sessionStorage.getItem("start"));
      }
      if(sessionStorage.getItem("end")){
        $('#end').val(sessionStorage.getItem("end"));
      }
    }else{
      if(sessionStorage.getItem("start")){
        this.startHour = sessionStorage.getItem("start").split(":")[0];
        this.startMinute = sessionStorage.getItem("start").split(":")[1];
        this.startSecond = sessionStorage.getItem("start").split(":")[2].split(" ")[0];
      }
      if(sessionStorage.getItem("end")){
        this.endHour = sessionStorage.getItem("end").split(":")[0];
        this.endMinute = sessionStorage.getItem("end").split(":")[1];
        this.endSecond = sessionStorage.getItem("end").split(":")[2].split(" ")[0];
      }
    }
  }
  ngOnDestroy(){
    clearInterval(this.interval);
    if(sessionStorage.getItem("start")) {
      sessionStorage.removeItem('start');
    };
    if(sessionStorage.getItem("end")) {
      sessionStorage.removeItem('end');
    };
    if(sessionStorage.getItem("rule")) {
      sessionStorage.removeItem('rule');
    };
    if(sessionStorage.getItem("name")) {
      sessionStorage.removeItem('name');
    };
    if(sessionStorage.getItem("task")) {
      sessionStorage.removeItem('task');
    };
  }
  getHeight(){
    let height = window.innerHeight-140;
    return{
      "height":height+'px'
    }
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      if(JSON.stringify(param) != "{}"){
        //console.log(param);
        this.warnStatus = param['status'];
        //console.log(this.warnStatus);
        if(this.appCate=='实时流分析'){
          this.searchWarn(this.appId,0,this.chanName,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
        }else{
          this.getRuleId();
          this.searchWarn(this.appId,0,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
        }
      }
    });
    this.route.queryParams.subscribe(params => {
      if(JSON.stringify(params) != "{}"&& !params.pageNo){
        //console.log(params);
        this.taskName = params['taskName'];
        this.taskId = params['taskId'];
        this.once = params['once'];
        this.alarmRules = JSON.parse(params['alarmRules']);
        this.fileType = params['fileType'];
        if(this.fileType=='image'||this.fileType=='zip'){
          this.showTime = false;
          this.initTime();
        }else{
          this.showTime = true;
          this.getVideoTime();
        }
        this.warnRlue = this.alarmRules[0].ruleName;
        this.ruleId = this.alarmRules[0].ruleId;
        this.warnService.searchOffWarns(this.appId,this.taskId,this.taskName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null)
        //this.warnService.searchOffWarns(this.appId,this.taskId,this.taskName,-1,this.warnStatus,this.page-1,this.pageMaxItem,null,null)
          .subscribe(result=>{
            this.warnTask = this.taskName;
            this.getWarnList(result);
          })
      }
    });
    calc_height(document.getElementById('warn-content'));
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
    this.startTime = $('#start').val("");
    this.endTime = $('#end').val("");

  }
  allSel(){
    let arr:any[]=[];
    for(var i in this.allWarn){
      if(!this.allFlag){
        this.allWarn[i]['selected']=true;
        arr.push(this.allWarn[i].alarmsId);
      }else{
        this.allWarn[i]['selected']=false;
        arr.push(this.allWarn[i].alarmsId);
      }
    }
    if(!this.allFlag){
      this.allFlag=true;
      //this.setAlarmCheck(arr,true);
    }else{
      this.allFlag=false;
      //this.setAlarmCheck(arr,false);
    }
  }
  setAlarmCheck(alarmsId,selected){
    this.warnService.setAlarmCheck(alarmsId,selected)
      .subscribe(result=>{

      })
  }
/*  downImage(item){
    var blob = new Blob([`${this.SERVER_URL}/download/${this.getDownPath(item.imagePath)}`], {
      "type":"text/image-png"
    });
    var link = document.createElement("a");

    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      link.setAttribute("href", window.URL.createObjectURL(blob));
      link.setAttribute("download", "download");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }*/
  check(item){
    if(item.selected!=true){
      item.selected = true;
    }else{
      item.selected = false;
      this.allFlag=false;
    }
    //this.alarmsId=[];
    //this.alarmsId.push(item.alarmId);
    //this.setAlarmCheck(this.alarmsId,item.selected);
    for(var i in this.allWarn){
      if(!this.allWarn[i].selected){
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
    this.imageUrl = url.slice(17);
    console.log(this.imageUrl);
  }
  slicePath(url){
    return url.slice(17)
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
      this.start = this.startTime+" 000";
    }
    if($('#end').val()==''){
      this.end = null;
    }else{
      this.end = this.endTime+" 000";
    }
  }
  date(item){
    if(item){
      let time = item.split('T');
      //console.log(time[0]+' '+time[1].substring(0,8));
      return time[0]+' '+time[1].substring(0,8);
    }
  }

  deleteChange(event){
    this.deleteIndex = event;
  }
  lookHandling(item){
    item.alarmStatus = '已处理';
  }
  getWarnList(result){
    this.allWarn = result.content;
/*    if(!this.init){
      for(let i=0;i<this.allWarn.length;i++){
        this.allWarn[i].selected = false;
        this.alarmsId.push(this.allWarn[i].alarmsId);
      }
      this.setAlarmCheck(this.alarmsId,false);
    }
    this.init = false;
    console.log(this.allWarn);*/
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
      if(this.allWarn[i]['selected'] == true){
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
  search(){
    this.validation();
    this.pageNow=0;
    let startTime;
    let endTime;
    if(this.startTime==''){
      startTime=null;
    }else{
      startTime=this.startTime+" 000";
    }
    if(this.endTime==''){
      endTime=null;
    }else{
      endTime=this.endTime+" 000";
    }
    if(this.appCate=='实时流分析'){
      sessionStorage.setItem("name" , this.chanName);
      this.sessionSet();
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }else{
        this.searchWarn(this.appId,0,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }
    }else{
      this.offline_startTime = this.handleOfflineTime()[0];
      this.offline_endTime = this.handleOfflineTime()[1];
      sessionStorage.setItem("task" , this.warnTask);
      this.sessionSet();
      this.getTaskId();
      this.searchWarn(this.appId,this.taskId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.handleOfflineTime()[0],this.handleOfflineTime()[1]);
    }
  }
  searchWarn(id,taskId,nameTask,ruleId,status,page,size,start,end){
    if(this.appCate=='实时流分析'){
      //console.log(this.appId);
      //console.log(this.ruleId);
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
  backWarn(obj){
    if(this.pageNow){
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,obj,this.ruleId,'全部',this.pageNow-1,this.pageChange,null,null);
      }else{
        this.searchWarn(this.appId,0,obj,this.ruleId,'全部',this.pageNow-1,this.pageChange,null,null);
      }
    }else{
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,obj,this.ruleId,'全部',this.page-1,this.pageMaxItem,null,null);
      }else{
        this.searchWarn(this.appId,0,obj,this.ruleId,'全部',this.page-1,this.pageMaxItem,null,null);
      }
    }
  }
  getTime(item?){
    if(item){
      let re = item.split('-');
      return re[2].substring(2);
    }
  }
  cancel(){
    this.lookIndex = 0;
    if(this.appCate=="实时流分析"){
      this.backWarn(this.chanName);
    }else{
      this.backWarn(this.warnTask);
    }
  }
  getMaxHeight(id){
    if($("#img").length>0){
      return
    }else{
      let imgObj = new Image();
      imgObj.src = $("#image").attr("src");
      console.log(imgObj.src);
      imgObj.id = "img";
      $(".showImage").append(imgObj);
      console.log($("#img").width());
      imgObj.addEventListener("load",this.getWH);
      $("#img").css("display","none");
    }
  }
  getWH(){
    let obj:any;
document.getElementById("image")
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
      var tempPathArr = path.split("/");
      var name = tempPathArr[tempPathArr.length - 1];
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.download = name;
      a.href  = URL.createObjectURL(data.blob());
      a.click();
      a.remove();
    });
  }
}
