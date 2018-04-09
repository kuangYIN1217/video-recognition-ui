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
  ruleName:string='';
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
  createFlag:boolean = true;
  saveFlag:boolean = true;
  ruleNameMust:number = 0;
  perName:number=0;
  @Output() indexChange: EventEmitter<any> = new EventEmitter();

  constructor(private warnService: WarnService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    //console.log(this.appId);
    this.radioIndex = 0;
    this.warnService.getWarnChannel(this.appId)
      .subscribe(channel=>{
        this.warnChanArr=channel;
      });
    this.objName='';
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
        //console.log(this.photoContainer);
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
  validInput(){
    if(/^[\u4E00-\u9FA5]{1,5}$/.test(this.objName)){
       //this.objName.substring(0,this.objName.length-1);
      //console.log(1);
    }
  }
  changeDetail(){
    if(this.warnObjDetail=='人'){
      this.identifyName = '人';
    }else{
      this.identifyName = '';
    }
  }
  warnChanCheckedChange(event){
    //console.log(event);
    this.warnChecked = event;
  }
  chanChange(event){
    this.warnChannel = event.join(',');
    //console.log(this.warnChannel);
  }
  chanChangeId(event){
    //console.log(event);
    this.warnChannelId = event.join(',');
    //console.log(this.warnChannelId);
  }
/*  ngOnInit(){
    this.warnChannel = this.warnChanArr[0].channelName;
    this.warnObj = this.warnObjArr[0];
  }*/
  ngOnChanges(...args: any[]) {
    this.checked = 0;
    this.chanRequired1=0;
    this.chanRequired2=0;
    //console.log(this.ruleList);
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

      }
      //console.log(this.warnChannelId);
      //console.log(this.warnChanChecked);
    }
    for(let k=0;k<this.warnChanArr.length;k++){
      this.warnChanArr[k].flag=2;
    }
    //console.log(this.warnChanArr);
    //this.getObj();
    if(JSON.stringify(this.ruleList)!="{}"&&this.ruleList.ruleName!=""){
      this.warnService.getWarnObjOne()
        .subscribe(result=>{
          this.warnObjArr=result;
          for(let i=0;i<this.warnObjArr.length;i++){
            for(let j=0;j<this.warnObjArr[i].recognitionCategories.length;j++){
              if(this.ruleList.recognitionCategory.cateId==this.warnObjArr[i].recognitionCategories[j].cateId){
                this.warnObj = this.warnObjArr[i].classificationName;
                this.warnObjDetail = this.ruleList.recognitionCategory.name;
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
      this.objName="";
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
    //console.log(this.validation());
    if(this.validation()==false){
      return false;
    };
    this.photoUrl=this.getPhoto();
    if(!this.createFlag) {
      return;
    };
    if(this.ruleNameMust==1){
      return false
    }
    this.createFlag = false;
    var myDate = new Date();
    //获取当前年
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    var now=year+'-'+this.p(month)+"-"+this.p(date)+" "+this.p(h)+':'+this.p(m)+":"+this.p(s)+" 000";
    if(this.identifyName=='人'){
      if(this.photoUrl.length>0&&(this.objName!=''&&this.objName!=null&&this.objName!=undefined)){

      }else{
        this.deleteIndex =1;
        this.tip_title = '提示';
        this.tip_content = '告警对象为人，特征名称和特征图片不能为空！';
        this.createFlag = true;
        return false
      }
    }
    this.warnService.createWarn(this.appId,this.ruleName,this.cateId,this.code,this.objName,this.status,this.photoUrl,now)
      .subscribe(result=>{
        if(result.text().substring(0,2)=='Ok'){
        this.createIndex = 2;
        this.indexChange.emit(this.createIndex);
        this.createFlag = true;
        }else if(result.text().substring(0,2)=='No'){
          this.deleteIndex =1;
          this.tip_title = '提示';
          this.tip_content = '通道未开启，请开启通道！';
          this.tip_btn = '开启通道';
          this.createFlag = true;
        }else if(result.text().substring(0,2)=='Er'){
          this.deleteIndex =1;
          this.tip_title = '提示';
          this.tip_content = result.text().substring(5);
          this.createFlag = true;
        }
      })
  }
  p(s) {
    return s < 10 ? '0' + s: s;
  }
  editSave(){
    if(this.validation()==false){
      return false;
    };
    this.photoUrl=this.getPhoto();
    if(!this.saveFlag) {
      return;
    }
    if(this.ruleNameMust==1){
      return false
    }
    this.saveFlag = false;
    if(this.identifyName=='人'){
      if(this.photoUrl.length>0&&(this.objName!=''&&this.objName!=null&&this.objName!=undefined)){

      }else{
        this.deleteIndex =1;
        this.tip_title = '提示';
        this.tip_content = '告警对象为人，特征名称和特征图片不能为空！';
        this.saveFlag = true;
        return false
      }
    }
    if(this.appCate=='实时流分析'){
      this.warnService.editRuleSave(this.ruleList.ruleId,this.ruleName,this.cateId,this.code,this.objName,this.status,this.photoUrl)
        .subscribe(result=>{
          //console.log(result);
          if(result.text().substring(0,2)=='Ok'){
            this.createIndex = 2;
            this.indexChange.emit(this.createIndex);
            this.saveFlag = true;
          }else if(result.text()=='No'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '通道未开启，请开启通道！';
            this.saveFlag = true;
          }else if(result.text().substring(0,2)=='Er'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = result.text().substring(5);
            this.saveFlag = true;
          }else if(result.text()=='Close'){
            this.createIndex = 2;
            this.indexChange.emit(this.createIndex);
            this.saveFlag = true;
          }
        })
    }else{
      this.warnService.editRuleSave1(this.ruleList.ruleId,this.ruleName,this.cateId,this.code,this.objName,this.status,this.photoUrl)
        .subscribe(result=>{
          if(result.text().substring(0,2)=='Ok'){
            this.createIndex = 2;
            this.indexChange.emit(this.createIndex);
            this.saveFlag = true;
          }else if(result.text()=='No'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '通道未开启，请开启通道！';
            this.saveFlag = true;
          }else if(result.text().substring(0,2)=='Er'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = result.text().substring(5);
            this.saveFlag = true;
          }
        })
    }
  }
/*  getScroll(){
    if(){
      return {
        "overflow-y":"auto"
      }
    }
  }*/
  deleteChange(event){
    this.deleteIndex = event;
  }
  back(){
    this.createIndex = 2;
    this.createFlag = true;
    this.indexChange.emit(this.createIndex);
  }
  checkName(){
    if(this.ruleName==''){
      this.chanRequired1 = 1;
      this.ruleNameMust = 0;
    }else{
      this.warnService.checkRuleName(this.appId,this.ruleName)
        .subscribe(
          (result=>{
            this.chanRequired1 = 0;
            this.ruleNameMust = 0;
          }),
          (error=>{
            if(error.status==400){
              this.chanRequired1 = 0;
              this.ruleNameMust = 1;
            }
          })
        )
    }
  }
}
