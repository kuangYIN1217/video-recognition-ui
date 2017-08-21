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
  appCate:string;
  deleteIndex:number;
  cateId:number;
  @Output() indexChange: EventEmitter<any> = new EventEmitter();

  constructor(private warnService: WarnService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    console.log(this.appId);
    this.radioIndex = 0;
    this.warnService.getWarnChannel(this.appId)
      .subscribe(channel=>{
        this.warnChanArr=channel;
      });
    this.warnService.getWarnObj()
      .subscribe(result=>{
        this.warnObjArr=result;
        if(this.warnObj){
          this.warnObj = this.warnObjArr[0].name;
          console.log(this.warnObj);
        }
      });
  }
  chanChange(event){
    this.warnChannel = event.join(',');
    console.log(this.warnChannel);
  }
  chanChangeId(event){
    console.log(event);
    this.warnChannelId = event.join(',');
    console.log(this.warnChannelId);
  }
/*  ngOnInit(){
    this.warnChannel = this.warnChanArr[0].channelName;
    this.warnObj = this.warnObjArr[0];
  }*/
  ngOnChanges(...args: any[]) {
    this.checked = 0;
    console.log(this.ruleList);
    this.warnChanChecked = [];
    this.warnChannel='';
    this.warnChannelId='';
    this.ruleName = this.ruleList.ruleName;
    if(this.ruleList.applicationChannels){
      for(let i=0;i< this.ruleList.applicationChannels.length;i++){
        if(this.warnChannel==''){
          this.warnChannel = this.ruleList.applicationChannels[0].channelName;
          this.warnChannelId= this.ruleList.applicationChannels[0].channelId;
        }else{
          this.warnChannel += ','+this.ruleList.applicationChannels[i].channelName;
          this.warnChannelId= ','+this.ruleList.applicationChannels[i].channelId;
        }
        this.warnChanChecked.push(this.ruleList.applicationChannels[i]);
        console.log(this.warnChanChecked);
      }
      console.log(this.warnChannelId);
    }
    //console.log(this.warnChanArr);
    if(this.ruleList.recognitionCategor){
      this.warnObj = this.ruleList.recognitionCategor.name;
    }
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
    for(let i in this.warnObjArr){
      if(this.warnObj==this.warnObjArr[i].name){
        this.cateId = this.warnObjArr[i].cateId;
      }
    }
    this.warnService.createWarn(this.appId,this.warnChannelId,this.ruleName,this.cateId,this.car,this.status)
      .subscribe(result=>{
        console.log(result);
        if(result.text()=='Ok'){
        this.createIndex = 2;
        this.indexChange.emit(this.createIndex);
        }else if(result.text()=='No'){
           alert("通道未开启，请开启xx通道！");
        }else if(result.text()=='Error'){
           alert("通道未开启成功！");
        }
      })
  }
  editSave(){
    if(this.car==undefined){
      this.car=null;
    }
    this.warnStatus();
    for(let i in this.warnObjArr){
      if(this.warnObj==this.warnObjArr[i].name){
        this.cateId = this.warnObjArr[i].cateId;
      }
    }
    if(this.warnObj!='车牌识别'){
      this.car = null;
    }
    if(this.appCate=='实时流分析'){
      this.warnService.editRuleSave(this.warnChannelId,this.ruleList.ruleId,this.ruleName,this.cateId,this.car,this.status)
        .subscribe(result=>{
          if(result.text()=='Ok'){
            this.createIndex = 2;
            this.indexChange.emit(this.createIndex);
          }else if(result.text()=='No'){
            alert("通道未开启，请开启xx通道！");
          }else if(result.text()=='Error'){
            alert("通道未开启成功！");
          }
        })
    }else{
      this.warnService.editRuleSave1(this.ruleList.ruleId,this.ruleName,this.cateId,this.car,this.status)
        .subscribe(result=>{
          if(result.text()=='Ok'){
            this.createIndex = 2;
            this.indexChange.emit(this.createIndex);
          }else if(result.text()=='No'){
            alert("通道未开启，请开启xx通道！");
          }else if(result.text()=='Error'){
            alert("通道未开启成功！");
          }
        })
    }

  }
  back(){
    this.createIndex = 2;
    this.indexChange.emit(this.createIndex);
  }
}
