import { Component, OnInit } from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
declare var $:any;
@Component({
  selector: 'apt-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.css'],
  providers: [WarnService]
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
  statusArr:any[]=["全部","开启","关闭"];
  constructor(private warnService: WarnService) {
    this.appId = window.sessionStorage.getItem("applicationId");
      this.warnService.getWarnRules()
        .subscribe(result=>{
          this.warnRlueArr = result;
          this.warnRlue = this.warnRlueArr[0];
        })
      this.warnService.getChanName(this.appId)
        .subscribe(result=>{
          this.chanNameArr=result;
          this.chanName = this.chanNameArr[0];
        })
    this.warnStatus = this.statusArr[0];
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
}
