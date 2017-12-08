import { Component,Input, Output,EventEmitter} from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {FileUploader} from "ng2-file-upload";
import {SERVER_URL} from "../../app.constants";
declare var $:any;
@Component({
  selector: 'warn-window',
  templateUrl: './warnwindow.component.html',
  styleUrls: ['./warnwindow.component.css'],
  providers: [WarnService]
})
export class WarnWindowComponent{
  SERVER_URL = SERVER_URL;
  allFlag:boolean=false;
  channelInfo:any[]=[];
  radioIndex:number;
  ruleName:string;
  objName:string;
  appId:string;
  warnChanArr:any[]=[];
  warnObjArr:any[]=[];
  warnChannel:string;
  warnChannelId:string;
  warnObj:string;
  code:string;
  checked:number=0;
  warnChanChecked:any[]=[];
  warnObjDetail:string;
  warnObjDetailArr:any[]=[];
  @Input() warn_title:string;
  @Input() createIndex:number;
  @Input() ruleList:any;
  status:string;
  appCate:string;
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  tip_btn:string;
  cateId:number;
  chanRequired1:number=0;
  chanRequired2:number=0;
  title:string='已选通道';
  warnChecked:any[]=[];
  photoContainer:any[]=[];
  container:any[]=[];
  photoUrl:string='';
  identifyName:string='';
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
    this.getObj();
  }
  getObj(){
    this.warnService.getWarnObjOne()
      .subscribe(result=>{
        this.warnObjArr=result;
        this.warnObj = this.warnObjArr[0].classificationName;
        this.changeWarn();
      });
  }
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });
  selectedFileOnChanged(event){
    for(let i=0;i<this.uploader.queue.length;i++){
      this.uploader.queue[i].onSuccess = (response: any, status: any, headers: any) => {
        this.photoContainer.push(response);
        console.log(this.photoContainer);
      };
    }
    this.uploader.uploadAll(); // 开始上传
  }
  delPhoto(index){
    //this.container.splice(index,1);
    this.photoContainer.splice(index,1);
  }
  outputImg(item){
    return item.slice(25);
  }
  changeWarn(){
    this.identifyName = '';
    for(let i=0;i<this.warnObjArr.length;i++){
      if(this.warnObjArr[i].classificationName==this.warnObj){
        this.warnObjDetailArr=this.warnObjArr[i].recognitionCategories;
        this.warnObjDetailArr.sort(function(a,b){
          return parseInt(b.cateId) - parseInt(a.cateId)
        })
        //this.warnObjDetailArr.reverse();
        this.warnObjDetail = this.warnObjDetailArr[0].name;
      }
    }
    this.changeDetail();
  }
  changeDetail(){
    if(this.warnObjDetail=='人'){
      this.identifyName = '人';
    }else{
      this.identifyName = '';
    }
  }
  warnChanCheckedChange(event){
    console.log(event);
    this.warnChecked = event;
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
    this.chanRequired1=0;
    this.chanRequired2=0;
    console.log(this.ruleList);
    this.warnChanChecked = [];
    this.warnChannel='';
    this.warnChannelId='';
    this.photoContainer=[];
    this.photoUrl='';
    this.ruleName = this.ruleList.ruleName;
    if(this.ruleList.applicationChannels){
      for(let i=0;i< this.ruleList.applicationChannels.length;i++){
        if(this.warnChannel==''){
          this.warnChannel = this.ruleList.applicationChannels[0].channelName;
          this.warnChannelId= this.ruleList.applicationChannels[0].channelId;
        }else{
          this.warnChannel += ','+this.ruleList.applicationChannels[i].channelName;
          this.warnChannelId+= ','+this.ruleList.applicationChannels[i].channelId;
        }
        this.warnChanChecked.push(this.ruleList.applicationChannels[i]);
        //console.log(this.warnChanChecked);
      }
      //console.log(this.warnChannelId);
    }
    //console.log(this.warnChanArr);
    //this.getObj();
    if(JSON.stringify(this.ruleList)!="{}"&&this.ruleList.ruleName!=""){
      this.warnService.getWarnObjOne()
        .subscribe(result=>{
          this.warnObjArr=result;
          for(let i=0;i<this.warnObjArr.length;i++){
            for(let j=0;j<this.warnObjArr[i].recognitionCategories.length;j++){
              if(this.ruleList.recognitionCategor.cateId==this.warnObjArr[i].recognitionCategories[j].cateId){
                this.warnObj = this.warnObjArr[i].classificationName;
                this.warnObjDetail = this.ruleList.recognitionCategor.name;
                this.warnObjDetailArr = this.warnObjArr[i].recognitionCategories;
                this.warnObjDetailArr.sort(function(a,b){
                  return parseInt(b.cateId) - parseInt(a.cateId)
                })
                this.changeDetail();
              }
            }
          }
        });
      this.objName = this.ruleList.targetFeature;
      if(this.ruleList.targetImages!=''&&this.ruleList.targetImages!=undefined){
        this.photoContainer=this.ruleList.targetImages.split(',');
      }
      if(this.ruleList.alarmRuleStatus=='开启'){
        this.radioIndex = 1;
      }else{
        this.radioIndex = 0;
      }
    }else{
      this.getObj();
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
  checkedRlues(e:any){
    var oev = e || event;
    this.checked=1;
    oev.preventDefault();
    oev.stopPropagation();
    return false;
  }
  hide(){
    this.checked = 0;
  }
  validation(){
    if(this.ruleName==''){
      this.chanRequired1=1;
      return false;
    }else{
      this.chanRequired1=0;
    }
    if(this.appCate=='实时流分析'){
      if(this.warnChannel==''){
        this.chanRequired2=1;
        return false;
      }else{
        this.chanRequired2=0;
      }
    }
    if(this.objName==undefined){
      this.objName=null;
    }
/*    if(this.warnObj!='车牌识别'){
      this.car = null;
    }*/
    this.warnStatus();
    for(let i in this.warnObjArr){
      if(this.warnObj==this.warnObjArr[i].classificationName){
        for(let j=0;j<this.warnObjArr[i].recognitionCategories.length;j++){
          if(this.warnObjDetail==this.warnObjArr[i].recognitionCategories[j].name){
            this.cateId = this.warnObjArr[i].recognitionCategories[j].cateId;
            this.code = this.warnObjArr[i].recognitionCategories[j].code;
            return
          }
        }
      }
    }
  }
  getPhoto(){
    let temp='';
    for(let i=0;i<this.photoContainer.length;i++){
      temp=temp+this.photoContainer[i]+",";
    }
    return temp.substring(0,temp.length -1);
  }
  create(){
    this.validation();
    this.photoUrl=this.getPhoto();
    this.warnService.createWarn(this.appId,this.warnChannelId,this.ruleName,this.cateId,this.code,this.objName,this.status,this.photoUrl)
      .subscribe(result=>{
        //console.log(result);
        if(result.text().substring(0,2)=='Ok'){
        this.createIndex = 2;
        this.indexChange.emit(this.createIndex);
        }else if(result.text().substring(0,2)=='No'){
          this.deleteIndex =1;
          this.tip_title = '提示';
          this.tip_content = '通道未开启，请开启通道！';
          this.tip_btn = '开启通道';
        }else if(result.text().substring(0,2)=='Er'){
          this.deleteIndex =1;
          this.tip_title = '提示';
          this.tip_content = result.text().substring(5);
        }
      })
  }
  editSave(){
    this.validation();
    this.photoUrl=this.getPhoto();
    if(this.appCate=='实时流分析'){
      this.warnService.editRuleSave(this.warnChannelId,this.ruleList.ruleId,this.ruleName,this.cateId,this.code,this.objName,this.status,this.photoUrl)
        .subscribe(result=>{
          //console.log(result);
          if(result.text().substring(0,2)=='Ok'){
            this.createIndex = 2;
            this.indexChange.emit(this.createIndex);
          }else if(result.text()=='No'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '通道未开启，请开启通道！';
          }else if(result.text().substring(0,2)=='Er'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = result.text().substring(5);
          }else if(result.text()=='Close'){
            this.createIndex = 2;
            this.indexChange.emit(this.createIndex);
          }
        })
    }else{
      this.warnService.editRuleSave1(this.ruleList.ruleId,this.ruleName,this.cateId,this.code,this.objName,this.status,this.photoUrl)
        .subscribe(result=>{
          if(result.text().substring(0,2)=='Ok'){
            this.createIndex = 2;
            this.indexChange.emit(this.createIndex);
          }else if(result.text()=='No'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '通道未开启，请开启通道！';
          }else if(result.text().substring(0,2)=='Er'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = result.text().substring(5);
          }
        })
    }

  }
  deleteChange(event){
    this.deleteIndex = event;
  }
  back(){
    this.createIndex = 2;
    this.indexChange.emit(this.createIndex);
  }
}
