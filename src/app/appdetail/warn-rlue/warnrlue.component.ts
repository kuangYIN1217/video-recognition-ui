import { Component } from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
declare var $:any;
@Component({
  selector: 'apt-rlue',
  templateUrl: './warnrlue.component.html',
  styleUrls: ['./warnrlue.component.css'],
  providers: [WarnService]
})
export class WarnRlueComponent{
  allFlag:boolean=false;
  appId:string;
  channelInfo:any[]=[];
  createIndex:number=0;
  warn_title:string;
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  rulesInfo:any[]=[];
  pageParams = new Page();
  page: number = 1;
  pageMaxItem: number = 10;
  ruleList:any={};
  warnObjArr:any[]=[];
  warnRule:string;
  warnStatus:string;
  deleted:number=0;
  statusArr:any[]=["全部","开启","关闭"];
  ruleName:string;
  deleteIdArr:any[]=[];
  tip_btn:string;
  appCate:string;
  warnChan:string;
  warnChanArr:any[]=[];
  warnChanId:number;
  constructor(private warnService: WarnService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    console.log(this.appId);
    console.log(this.appCate);
    if(this.appCate=="实时流分析"){
      this.getAllRlues(this.appId,this.page-1,this.pageMaxItem);
      this.warnService.getWarnObj()
        .subscribe(result=>{
          this.warnObjArr=result;
          if(this.warnObjArr)
          this.warnRule = this.warnObjArr[0];
        });
      this.warnStatus = this.statusArr[0];
      this.warnService.getWarnChannel(this.appId)
        .subscribe(channel=>{
          this.warnChanArr=channel;
          if(this.warnChanArr)
          this.warnChan = this.warnChanArr[0].channelName;
        });
    }

  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  getPageData(paraParam) {
    this.getAllRlues(this.appId,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  getAllRlues(id,page,size){
    this.warnService.getAllRlues(id,page,size)
      .subscribe(result=>{
        this.rulesInfo = result.content;
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }
  allSel(){
    for(var i in this.rulesInfo){
      if(this.allFlag==false){
        this.rulesInfo[i]['flag']=1;
      }else{
        this.rulesInfo[i]['flag']=2;
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
    for(var i in this.rulesInfo){
      if(this.rulesInfo['flag']!=1){
        this.allFlag=false;
        return;
      }else{
        this.allFlag=true;
      }
    }
  }
  deletedChange(event){
    console.log(event);
    if(event==1){
      for(let i in this.deleteIdArr){
        console.log(this.deleteIdArr[i]);
          this.warnService.deleteRule(this.deleteIdArr[i].ruleId)
            .subscribe(result=>{
              if(result.text().substring(0,2)=='Ok'){
                this.getAllRlues(this.appId,this.page-1,this.pageMaxItem);
              }else if(result.text().substring(0,2)=='No'){
                alert("该规则下有开启通道！");
              }
            })
      }
    }
  }
  dia(){
    for(let i in this.rulesInfo){
      if(this.rulesInfo[i]['flag'] == '1'&&this.rulesInfo[i].alarmRuleStatus=='开启'){
        this.deleteIndex =1;
        this.tip_title = '提示';
        this.tip_content = '该告警不可删除！';
        return false;
      }else if(this.rulesInfo[i]['flag'] == '1'&&this.rulesInfo[i].alarmRuleStatus=='关闭'){
        this.deleteIndex =1;
        this.tip_title = '删除';
        this.tip_content = '是否删除该告警！';
        this.deleteIdArr.push(this.rulesInfo[i]);
      }
    }
  }
  searchRule(){
    for(let i in this.warnChanArr){
      if(this.warnChanArr[i].channelName==this.warnChan){
        this.warnChanId = this.warnChanArr[i].channelId;
      }
    }
    this.warnService.searchRules(this.appId,this.ruleName,this.warnChanId,this.warnRule,this.warnStatus,this.page-1,this.pageMaxItem)
      .subscribe(result=>{
        this.rulesInfo = result.content;
        //console.log(result);
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }
  runRule(item){
    if(item.alarmRuleStatus=='关闭'){
      item.alarmRuleStatus='开启';
    }else if(item.alarmRuleStatus=='开启'){
      item.alarmRuleStatus='关闭';
    }
    console.log(item);
    this.warnService.warnRuleSwitch(item.ruleId,item.alarmRuleStatus)
      .subscribe(reply =>{
        console.log(reply.text());
        if(reply.text()=='No'){
          this.deleteIndex = 1;
          this.tip_title = "提示";
          this.tip_content = "该告警下没有开启通道！";
          this.tip_btn = "开启通道";
        }
        this.start_reply(reply);
      });
  }
  start_reply(reply){
    if(reply.status==200){
      console.log("Start Successfully!");
    }else{
      console.log("Start Failed!");
    }
    this.getAllRlues(this.appId,this.page-1,this.pageMaxItem);
  }
  edit(item){
    if(item.alarmRuleStatus=='开启'){
      return false;
    }else{
      this.createIndex=1;
      this.warn_title="修改规则";
      this.ruleList = item;
    }
  }
  lookRule(item){
    this.createIndex=1;
    this.warn_title="任务详情";
    this.ruleList = item;
  }
  indexChange(event){
    this.createIndex = event;
    this.getAllRlues(this.appId,this.page-1,this.pageMaxItem);
  }
  deleteChange(event){
    this.deleteIndex = event;
  }
  createWarn(){
    this.createIndex=1;
    this.warn_title="新建规则";
  }
  delete(){
    this.deleteIndex = 1;
    this.tip_title = "删除";
    this.tip_content = "删除所选通道?"
  }
}
