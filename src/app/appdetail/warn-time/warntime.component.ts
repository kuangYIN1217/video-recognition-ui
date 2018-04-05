import {Component , OnInit, ViewChild} from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SERVER_URL} from "../../app.constants";
import {calc_height} from "app/common/ts/calc_height";
import { HostListener } from '@angular/core';
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
  warnRlue1:string;
  chanName1:string;
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
        if(this.pageNow){
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.chanName1,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }else{
            this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }
        }else{
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.chanName1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }else{
            this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }
        }
      }, 15000);
    }else{
      this.interval = setInterval(() => {
        if(sessionStorage.getItem("task")){
          this.warnTask1 = sessionStorage.getItem("task");
        }
        this.session();
        this.getRuleId();
        if(this.pageNow){
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }else{
            this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.pageNow-1,this.pageChange,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }
        }else{
          if(this.taskId>0){
            this.searchWarn(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }else{
            this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.getPeriodTime()[0],this.getPeriodTime()[1]);
          }
        }
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
            this.warnRlue1 = this.warnRlueArr[0].ruleName;
            this.ruleId = this.warnRlueArr[0].ruleId;
          };
          this.warnService.getChanName(this.appId)
            .subscribe(result=>{
              this.chanNameArr=result;
              //console.log(this.chanNameArr);
              this.chanName1 = this.chanNameArr[0];
              this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
            });
        });
    }else{
      this.warnService.getWarnTask(this.appId,"video")
        .subscribe(result=>{
          this.warnTaskArr = result;
          if(this.warnTaskArr.length>0){
            this.warnTaskArr = this.filterPerson(this.warnTaskArr);
            this.warnTask1 = this.warnTaskArr[0].taskName;
            this.videoUrl = this.warnTaskArr[0].outputPath;
            if(this.warnTaskArr[0].alarmRules.length>0){
              this.warnTaskArr[0].alarmRules = this.filterPerson(this.warnTaskArr)[0].alarmRules;
              this.warnRlueArr = this.warnTaskArr[0].alarmRules;
              this.warnRlue1 = this.warnTaskArr[0].alarmRules[0].ruleName;
              this.ruleId = this.warnTaskArr[0].alarmRules[0].ruleId;
              if(this.warnRlue1==""||this.warnRlue1==undefined){
                this.searchWarn(this.appId,0,this.warnTask1,0,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
              }else{
                this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
              }
            }
          };
        });
    }
    this.warnStatus = this.statusArr[0];
    this.route.params.subscribe((param) => {
      if(JSON.stringify(param) != "{}"){
        this.warnStatus = param['status'];
        this.getRuleId();
        $("#start1").val('');
        $("#end1").val('');
        if(this.appCate=='实时流分析'){
          this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
        }else{
          this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null);
        }
      }
    });
    this.route.queryParams.subscribe(params => {
      if(JSON.stringify(params) != "{}"&& !params.pageNo){
        //console.log(params);
        this.taskName = params['taskName'];
        this.taskId = params['taskId'];
        this.getRuleId();
        this.warnService.searchOffWarns(this.appId,this.taskId,this.taskName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null)
          .subscribe(result=>{
            this.warnTask1 = this.taskName;
            this.getWarnList(result);
          })
      }
    });
  }
  filterPerson(arr){
    let taskArr:any[]=[];
    for(let k=0;k<arr.length;k++){
      if(arr[k].alarmRules.length>0){
        for(let i=0;i<arr[k].alarmRules.length;i++){
          if(arr[k].alarmRules[i].recognitionCategory.name!="全部"&&arr[k].alarmRules[i].targetImages!=''){
            taskArr.push(arr[k]);
          }
        }
      }
    }
    return taskArr
  }
  filterUrl(url?){
    return url.substring(17);
  }
  changeWarnTask(){
    for(let i=0;i<this.warnTaskArr.length;i++){
      if(this.warnTaskArr[i].taskName==this.warnTask1){
        if(this.warnTaskArr[i].fileType=='image'){
          this.showTime = false;
        }else{
          this.showTime = true;
        };
        if(this.warnTaskArr[i].outputPath!=null){
          this.videoUrl = this.warnTaskArr[i].outputPath;
          console.log(this.videoUrl);
        }else{
          this.videoUrl = '';
        }
        this.warnRlueArr = this.warnTaskArr[i].alarmRules;
        let tempArr:any[]=[];
        for(let j=0;j<this.warnRlueArr.length;j++){
          if(this.warnRlueArr[j].recognitionCategory.name!="全部"&&this.warnRlueArr[j].recognitionCategory.targetImages!=""){
            tempArr.push(this.warnRlueArr[j]);
          }
        }
        this.warnRlueArr = tempArr;
        if(this.warnRlueArr.length>0){
          this.warnRlue1 = this.warnTaskArr[i].alarmRules[0].ruleName;
          this.ruleId = this.warnTaskArr[i].alarmRules[0].ruleId;
        }else{
          this.warnRlue1 = '';
          this.ruleId = 0;
        }
        break;
      }
    }
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
/*  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
  };*/
  videoPause() {
    this.myVideo = this.offlinePeriodVideo.nativeElement;
    this.currentTime = this.myVideo.currentTime+"";
    //console.log(this.currentTime);
    let start:number;
    let end:number;
    parseFloat(this.currentTime);
    start = parseFloat(this.currentTime)-0.05;
    end = parseFloat(this.currentTime)+0.05;
    this.searchWarn(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.changeTime(start),this.changeTime(end));
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
  changTime(time){
    if(time<10){
      time = "0"+time;
    }else{
      time = String(time);
    }
    return time;
  }
  handHighTime(time){
    let arr:any[]=[];
    arr = time.split(" ");
    return (arr[1]+" "+String(Number(arr[2])+50));
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
    if(sessionStorage.getItem("start1")){
      $('#start1').val(sessionStorage.getItem("start1"));
    }
    if(sessionStorage.getItem("end1")){
      $('#end1').val(sessionStorage.getItem("end1"));
    }
    if(sessionStorage.getItem("periodTime")){
      this.periodTime = sessionStorage.getItem("periodTime");
    }
    if(sessionStorage.getItem("periodTimeArr")){
      this.periodTimeArr = sessionStorage.getItem("periodTimeArr").split(",");
    }
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

    if(this.appCate=="实时流分析"){
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
    }else{
      $("#start1").jeDate({
        isinitVal:true,
        festival: false,
        format: 'hh:mm:ss',
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
        format: 'hh:mm:ss',
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
    }
    this.startTime = $('#start1').val("");
    this.endTime = $('#end1').val("");
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
    //console.log(item);
    // this.router.navigate(['../warndetail'],{queryParams: {'detailList':item}});
    this.lookIndex=1;
    this.detaillist = item;
    //console.log(this.detaillist);
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
      this.validation();
      this.sessionSet();
      this.session();
      if(this.warnRlue1=='全部'){
        this.judgeTime();
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.chanName1,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }else{
          this.searchWarn(this.appId,0,this.chanName1,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }
      }else{
        this.judgeTime();
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
      if(this.warnRlue1=='全部'){
        this.judgeTime();
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.warnTask1,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }else{
          this.searchWarn(this.appId,0,this.warnTask1,-1,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }
      }else{
        this.judgeTime();
        if(this.taskId>0){
          this.searchWarn(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }else{
          this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,paraParam.curPage-1,paraParam.pageMaxItem,this.start1,this.end1);
        }
      }
    }
    this.pageNow=paraParam.curPage;
    this.pageChange = Number(paraParam.pageMaxItem);
    //console.log(this.pageNow,Number(this.pageChange));
  }
  getRuleId(){
    if(this.warnRlue1==''){
      this.ruleId = 0;
    }else{
      for(let i=0;i<this.warnRlueArr.length;i++){
        //console.log(this.warnRlueArr[i].ruleName);
        if(this.warnRlueArr[i].ruleName == this.warnRlue1){
          this.ruleId = this.warnRlueArr[i].ruleId;
        }
      }
    }
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
    console.log($('#start1').val(),$('#end1').val());
    sessionStorage.setItem("rule" , this.sessionRules);
    sessionStorage.setItem("status" , this.warnStatus);
    sessionStorage.setItem("start1" , $('#start1').val());
    sessionStorage.setItem("end1" , $('#end1').val());
  }
  validation(){
    this.startTime = $('#start1').val();
    this.endTime = $('#end1').val();
    if(this.warnRlue1!=''&&this.warnRlue1!=undefined){
      for(let i=0;i<this.warnRlueArr.length;i++){
        //console.log(this.warnRlueArr[i].ruleName);
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
          //this.getWarnList(result);
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
      for(var key in result){
        let key1:string;
        let value:string;
        if(this.appCate=="实时流分析"){
          key1 = key.replace(/-/g, "/");
          value = result[key].replace(/-/g, "/");
        }else{
          key1 = this.getTime(key);
          value = this.getTime(result[key]);
        }
        let key_value = key1 + "-" + value;
        this.periodTimeArr.push(key_value);
      }
     this.periodTime = this.periodTimeArr[0];
      if(this.periodTime!=''){
        this.playVideo(this.periodTime);
      }
      //sessionStorage.setItem("periodTime" , this.periodTime);
     //sessionStorage.setItem("periodTimeArr" , this.periodTimeArr.join(','));
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
      if(this.dateCompare(start,end)){
        this.validation();
          sessionStorage.setItem("name" , this.chanName1);
          this.sessionSet();
          start = start+" 000";
          end = end+" 000";
          if(this.taskId>0){
            this.searchPeriod(this.appId,this.taskId,this.chanName1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
          }else{
            this.searchPeriod(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
          }
      }else{
        this.deleteIndex = 1;
        this.tip_title = "提示";
        this.tip_content = "起始时间大于结束时间/起始时间和结束时间相差大于6小时！";
        $("#start1").val('');
        $("#end1").val('');
        return false
      }
    }else{
      sessionStorage.setItem("task" , this.warnTask1);
      this.sessionSet();
      start = start+" 000";
      end = end+" 000";
      if(this.taskId>0){
        this.searchPeriod(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
      }else{
        this.searchPeriod(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,start,end);
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
        this.searchWarn(this.appId,this.taskId,this.chanName1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }else{
        this.searchWarn(this.appId,0,this.chanName1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }
    }else{
      sessionStorage.setItem("task" , this.warnTask1);
      this.sessionSet();
      if(this.taskId>0){
        this.searchWarn(this.appId,this.taskId,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }else{
        this.searchWarn(this.appId,0,this.warnTask1,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,startTime,endTime);
      }
    }
  }
  get_ckplayer_url1(){
    return this.SERVER_URL+"/download/livestream/prediction/1522491265972_hks_person/pred_video/output1.ts"
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
}
