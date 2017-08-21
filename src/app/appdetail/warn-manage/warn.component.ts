import { Component, OnInit } from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'apt-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.css'],
  providers: [WarnService,OfflineService]
})
export class WarnComponent{
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
  constructor(private warnService: WarnService,private offlineService: OfflineService,private router:Router) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
      this.getAllWarn(this.appId,this.page-1,this.pageMaxItem);
      this.warnService.getWarnRules(this.appId)
        .subscribe(result=>{
          this.warnRlueArr = result.content;
          this.warnRlue = this.warnRlueArr[0].ruleName;
        })
      this.warnService.getChanName(this.appId)
        .subscribe(result=>{
          this.chanNameArr=result;
          this.chanName = this.chanNameArr[0];
        })
    this.offlineService.getWarnTask(this.appId)
      .subscribe(result=>{
          this.warnTaskArr = result.content;
          //this.warnTask = this.warnTaskArr[0].taskName;
      })

    this.warnStatus = this.statusArr[0];
  }
  getAllWarn(id,page,size){
    this.warnService.getAllWarn(id,page,size)
      .subscribe(result=>{
        console.log(result.content);
        this.allWarn = result.content;
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  lookPhoto(item){
    // this.router.navigate(['../warndetail'],{queryParams: {'detailList':item}});
    this.lookIndex=1;
    this.detaillist = item;
    console.log(this.detaillist);
  }
/*  allSel(){
    for(var i in this.channelInfo){
      if(this.allFlag==false){
        this.channelInfo[i]['flag']=1;
      }else{
        this.channelInfo[i]['flag']=2;
      }
    }
    if(this.allFlag==false){
      this.allFlag=true;
    }else{
      this.allFlag=false;
    }
  }*/
  getPageData(paraParam) {
    this.getAllWarn(this.appId,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  searchWarn(){
    for(let i in this.warnRlueArr){
      if(this.warnRlueArr[i].ruleName = this.warnRlue){
        this.ruleId = this.warnRlueArr[i].ruleId;
      }
    }
    if(this.appCate=='实时流分析'){
      console.log(this.appId);
      console.log(this.ruleId);
      this.warnService.searchWarns(this.appId,this.chanName,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null)
        .subscribe(result=>{
          this.warnInfo = result.content;
          console.log(result);
          let page = new Page();
          page.pageMaxItem = result.size;
          page.curPage = result.number+1;
          page.totalPage = result.totalPages;
          page.totalNum = result.totalElements;
          this.pageParams = page;
        })
    }else{
      this.warnService.searchOffWarns(this.appId,this.warnTask,this.ruleId,this.warnStatus,this.page-1,this.pageMaxItem,null,null)
        .subscribe(result=>{
          this.warnInfo = result.content;
          console.log(result);
          let page = new Page();
          page.pageMaxItem = result.size;
          page.curPage = result.number+1;
          page.totalPage = result.totalPages;
          page.totalNum = result.totalElements;
          this.pageParams = page;
        })
    }
  }
}
