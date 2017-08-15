import { Component,Input, Output,EventEmitter} from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
declare var $:any;
@Component({
  selector: 'warn-window',
  templateUrl: './warnwindow.component.html',
  styleUrls: ['./warnwindow.component.css'],
  providers: [WarnService]
})
export class WarnWindowComponent{
  allFlag:boolean=false;
  channelInfo:any[]=[];
  radioIndex:number;
  ruleName:string;
  car:string;
  appId:string;
  warnChanArr:any[]=[];
  warnObjArr:any[]=[];
  warnChannel:string;
  warnChannelId:string;
  warnObj:string;
  checked:number=0;
  warnChanChecked:any[]=[];
  @Input() warn_title:string;
  @Input() createIndex:number;
  @Input() ruleList:any;
  status:string;
  @Output() indexChange: EventEmitter<any> = new EventEmitter();

  constructor(private warnService: WarnService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    console.log(this.appId);
    this.radioIndex = 0;
    this.warnService.getWarnChannel(this.appId)
      .subscribe(channel=>{
        this.warnChanArr=channel;
      });
    this.warnService.getWarnObj()
      .subscribe(result=>{
        this.warnObjArr=result;
        this.warnObj = this.warnObjArr[0];
        console.log(this.warnObj);
      });
  }
  chanChange(event){
    this.warnChannel = event.join(',');
    console.log(this.warnChannel);
  }
  chanChangeId(event){
    this.warnChannelId = event.join(',');
    console.log(this.warnChannelId);
  }
/*  ngOnInit(){
    this.warnChannel = this.warnChanArr[0].channelName;
    this.warnObj = this.warnObjArr[0];
  }*/
  ngOnChanges(...args: any[]) {
    console.log(this.ruleList);
    this.warnChanChecked = [];
    this.ruleName = this.ruleList.ruleName;
    for(let i in this.ruleList.applicationChannels){
      if(this.ruleList.applicationChannels.length==1){
        this.warnChannel = this.ruleList.applicationChannels[0].channelName;
      }else{
        this.warnChannel = ','+this.ruleList.applicationChannels[i].channelName;
      }
      this.warnChanChecked.push(this.ruleList.applicationChannels[i]);
      console.log(this.warnChanChecked);
    }
    console.log(this.warnChannel);
    //console.log(this.warnChanArr);
    this.warnObj = this.ruleList.alarmTarget;
    this.car = this.ruleList.targetFeature;
    if(this.ruleList.alarmRuleStatus=='开启'){
      this.radioIndex = 1;
    }else{
      this.radioIndex = 0;
    }
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  radio(i){
    this.radioIndex = i;
  }
  warnStatus(){
  if(this.radioIndex==0){
    this.status = '关闭';
  }else{
    this.status = '开启';
  }
}
/*  warnChanges(name){
    for(let i in this.warnChanArr){
      if (name == this.warnChanArr[i].channelName) {
        this.warnChannelId = this.warnChanArr[i].channelId;
      }
    }
    console.log(this.warnChannelId);
  }*/
  checkedRlues(){
    if(this.checked==0){
      this.checked=1;
    }else{
      this.checked=0;
    }
  }
  create(){
    if(this.car==undefined){
      this.car=null;
    }
    this.warnStatus();
    this.warnService.createWarn(this.appId,this.warnChannelId,this.ruleName,this.warnObj,this.car,this.status)
      .subscribe(result=>{
        this.createIndex = 2;
        this.indexChange.emit(this.createIndex);
      })
  }
  editSave(){
    if(this.car==undefined){
      this.car=null;
    }
    this.warnStatus();
    this.warnService.editRuleSave(this.ruleList.ruleId,this.ruleName,this.warnObj,this.car,this.status)
      .subscribe(result=>{
        this.createIndex = 2;
        this.indexChange.emit(this.createIndex);
      })
  }
  back(){
    this.createIndex = 2;
    this.indexChange.emit(this.createIndex);
  }
}
