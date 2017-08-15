import { Component } from '@angular/core';
import {SERVER_URL} from "app/app.constants";
import {FileUploader} from "ng2-file-upload";
import {WarnService} from "../../common/services/warn.service";
import {OfflineService} from "../../common/services/offline.service";
declare var $:any;
@Component({
  selector: 'create-text',
  styleUrls: ['./css/createtext.component.css'],
  templateUrl: './templates/createtext.html',
  providers: [WarnService,OfflineService]
})
export class CreateTextComponent {
  SERVER_URL = SERVER_URL;
  taskTitle:string="新建任务";
  checked:number=0;
  warnRlue:string;
  warnChanArr:any[]=[];
  appId:string;
  appCate:string;
  warnRule:string;
  warnRuleId:string;
  taskName:string;
  required:number=0;
  constructor(private warnService: WarnService,private offlineService: OfflineService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    console.log(this.appId);
    console.log(this.appCate);
    this.warnService.getWarnRules(this.appId)
      .subscribe(result=>{
        this.warnChanArr = result.content;
        //this.warnRlue = this.warnChanArr[0].ruleName;
        console.log(this.warnChanArr);
      })
  }
/*  Headers: Headers = this.appManageService.getHeaders();
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/uploadOfflineFile",
    method: "POST",
    itemAlias: "file",
  });*/
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  create(){
    if(!this.taskName){
      this.required = 1;
      return false;
    }if(!this.warnRule){
      this.required = 1;
      return false;
    }/*if(this.uploader.queue.length==0){
      this.required = 1;
      return false;
    }*/
  }
  chanChange(event){
    this.warnRule = event.join(',');
    console.log(this.warnRule);
  }
  chanChangeId(event){
    this.warnRuleId = event.join(',');
    console.log(this.warnRuleId);
  }
  checkedRlues(){
    if(this.checked==0){
      this.checked=1;
    }else{
      this.checked=0;
    }
  }
}
