import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'apt-rlue',
  templateUrl: './warnrlue.component.html',
  styleUrls: ['./warnrlue.component.css']
})
export class WarnRlueComponent{
  allFlag:boolean=false;
  channelInfo:any[]=[];
  createIndex:number=0;
  warn_title:string;
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  constructor() {

  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  allSel(){
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
  }
  indexChange(event){
    this.createIndex = event;
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
