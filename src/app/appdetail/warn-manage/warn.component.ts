import { Component, OnInit} from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SERVER_URL} from "../../app.constants";
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
  constructor(private warnService: WarnService,private offlineService: OfflineService , private route: ActivatedRoute , private router: Router) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
      this.getAllWarn(this.appId,this.page-1,this.pageMaxItem);
      this.warnService.getWarnRules(this.appId)
        .subscribe(result=>{
          this.warnRlueArr = result.content;
          console.log(this.warnRlueArr);
          if(this.warnRlueArr.length>0){
            this.warnRlue = this.warnRlueArr[0].ruleName;
          }
        })
      this.warnService.getChanName(this.appId)
        .subscribe(result=>{
          this.chanNameArr=result;
          this.chanName = this.chanNameArr[0];
        })
    this.offlineService.getWarnTask(this.appId)
      .subscribe(result=>{
          this.warnTaskArr = result.content;
          if(this.warnTaskArr.length>0){
            this.warnTask = this.warnTaskArr[0].taskName;
          }
      })
    this.warnStatus = this.statusArr[0];
  }
  ngOnInit() {
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
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
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
  seePhoto(){
    this.seeIndex = 1;
  }
  close(){
    this.seeIndex = 0;
  }
  getPageData(paraParam) {
    this.getAllWarn(this.appId,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  handling(item){
    this.warnService.handlingWarn(item.alarmId,this.appId)
      .subscribe(result=>{
        this.getWarnList(result);
      })
  }
  lookHandling(item){
    item.alarmStatus = '已处理';
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

  thumbnail(item){

  }
  export(){
    for(let i in this.allWarn){
      if(this.allWarn[i]['flag'] == '1'){
          console.log(this.allWarn[i]);
          this.alarmIds += this.allWarn[i].alarmId+',';
        this.sourcePaths+=this.allWarn[i].imagePath+',';
      }
    }
    this.warnService.alarmExport(this.appId,this.appCate,this.alarmIds.substring(0,this.alarmIds.length-1),this.alarmIds.substring(0,this.sourcePaths.length-1))
     .subscribe(result=>{
       console.log(result.text());
       let url = decodeURIComponent(result.text());
       console.log(SERVER_URL+url);
       window.open(SERVER_URL+"/"+url);
     })
  }
  searchWarn(){
    for(let i=0;i<this.warnRlueArr.length;i++){
      console.log(this.warnRlueArr[i].ruleName);
      if(this.warnRlueArr[i].ruleName == this.warnRlue){
        this.ruleId = this.warnRlueArr[i].ruleId;
      }
    }
    if(this.startTime==undefined){
      this.startTime=null;
    }
    if(this.endTime==undefined){
      this.endTime=null;
    }
    if(this.appCate=='实时流分析'){
      console.log(this.appId);
      console.log(this.ruleId);
      this.warnService.searchWarns(this.appId,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.startTime,this.endTime)
        .subscribe(result=>{
          this.getWarnList(result);
        })
    }else{
      this.warnService.searchOffWarns(this.appId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,this.startTime,this.endTime)
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
