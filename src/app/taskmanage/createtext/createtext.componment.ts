import { Component } from '@angular/core';
import {SERVER_URL} from "app/app.constants";
import {FileUploader, FileItem} from "ng2-file-upload";
import {WarnService} from "../../common/services/warn.service";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
import {calc_height} from "../../common/ts/calc_height";
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
  required1:number=0;
  required2:number=0;
  required3:number=0;
  ruleId:string;
  showArr:any[]=[];
  progress:number=0;
  inputPathArr:any[]=[];
  inputPath:string;
  fileName:string;
  fileNameArr:any[]=[];
  fileNumber:number;
  tasklist:any={};
  size:number=0;
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  fileNames:string;
  temArr:any[]=[];
  warnRuleArr:any[]=[];
  lookIndex:number=0;
  showName:any[]=[];
  taskId:number;
  fileSize:any[]=[];
  showFile:any[]=[];
  fileObj:any={};
  alarmId:string;
  title:string='已选规则';
  offlineFiles:any[]=[];
  upOfflineFiles:any[]=[];
  offlineObj:any={};
  warnChanChecked:any[]=[];
  warnChecked:any[]=[];
  choose:string='video';
  choosed:string='video';
  constructor(private warnService: WarnService,private offlineService: OfflineService,private router:Router,private route: ActivatedRoute) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    //console.log(this.appId);
    //console.log(this.appCate);
    this.warnService.getWarnRules(this.appId)
      .subscribe(result=>{
        this.warnChanArr = result.content;
        //this.warnRule = this.warnChanArr[0].ruleName;
        //console.log(this.warnChanArr);
      })
  }
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });
  onlyUploadOne(type){
    this.size = this.uploader.queue[0].file.size;
    if((this.size/1024/1024/1024)>1){
      this.deleteIndex =1;
      this.tip_title = '提示';
      this.tip_content = this.uploader.queue[0].file.name +'文件大于1GB！';
      return false;
    }
    if(this.showFile.length>0){
      return false
    }
    if(this.uploader.queue.length>1){
      this.uploader.queue[1].remove();
    }else{
      let name = this.uploader.queue[0].file.name;
      if(type=='video'){
        if(name.substring(name.length-3,name.length)!='mp4'&&name.substring(name.length-3,name.length)!='avi'){
          this.uploader.queue[0].remove();
          return
        };
      }else if(type=='zip'){
        if(name.substring(name.length-3,name.length)!='zip'&&name.substring(name.length-3,name.length)!='ZIP'){
          this.uploader.queue[0].remove();
          return
        };
      }
      let bool = this.isInArray(this.showArr,this.uploader.queue[0]);
      if(bool==false){
        this.showArr.push(this.uploader.queue[0]);
        this.getProgress(0);
      }
    }
  }
  selectedFileOnChanged(event,getType){
    if(getType=='video'){
      this.onlyUploadOne(getType);
    }else if(getType=='image'){
      for(let j=0;j<this.uploader.queue.length;j++){
        if(this.showFile.length>0&&(this.uploader.queue.length+this.showFile.length)>10){
          return false
        }else{
          this.size = this.uploader.queue[j].file.size;
          if((this.size/1024/1024/1024)>1){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = this.uploader.queue[j].file.name +'文件大于1GB！';
            return false;
          }
          if(Number(j)>9){
            this.uploader.queue[9].remove();
            j-=1;
            continue
          }else{
            let name = this.uploader.queue[j].file.name;
            if(name.substring(name.length-3,name.length)!='png'&&name.substring(name.length-3,name.length)!='jpg'){
              this.uploader.queue[j].remove();
              return
            };
            let bool = this.isInArray(this.showArr,this.uploader.queue[j]);
            if(bool==false){
              this.showArr.push(this.uploader.queue[j]);
              this.getProgress(j);
            }else{
              continue;
            }
          }
        }
      }
    }else if(getType=='zip'){
      this.onlyUploadOne(getType);
    }
  }
  getProgress(j){
    if(j>9){
      this.showArr.splice(9,1);
      return
    }else{
      this.uploader.onProgressItem=(fileItem: FileItem, progress: any)=>{
        this.progress=0;
        if(progress==100){
          setTimeout(()=>{
            fileItem.headers.flag=1;
          }, 300);
        }
      };
      this.uploader.queue[j].onSuccess = (response: any, status: any, headers: any) => {
        //console.log(response);
        if(this.choose=="zip"){
          let arr = response.split(',');
          for(let i=0;i<arr.length;i++){
            let obj:any={};
            obj = { "fileName":this.uploader.queue[j].file.name,"inputPath":arr[i] };
            this.offlineFiles.push(obj);
          }
        }else{
          this.offlineObj = { "fileName":this.uploader.queue[j].file.name,"inputPath":response };
          this.offlineFiles.push(this.offlineObj);
        }
        /*        this.inputPathArr.push(response);
         this.fileNameArr.push(this.uploader.queue[j].file.name);
         if(j==this.uploader.queue.length-1){
         this.inputPath = this.inputPathArr.join(',');
         this.fileName = this.fileNameArr.join(',');
         }*/
      };
      this.uploader.queue[j].onError = (response: any, status: any, headers: any)=>{
        this.deleteIndex =1;
        this.tip_title = '提示';
        this.tip_content = '压缩文件内格式不正确！';
        this.uploader.queue[0].remove();
        this.showArr=[];
      };
      this.uploader.queue[j].upload();
    }
  }
  removeArr(i){
    this.showFile.splice(i,1);
  }
  remove(i){
    this.showArr.splice(i,1);
    if(this.uploader.queue[i].isUploading){
      this.uploader.queue[i].cancel();
      this.uploader.queue[i].remove();
    }else{
      this.uploader.queue[i].remove();
    }
    this.analysis(i);
  }
  analysis(i){
    let index = this.uploader.getIndexOfItem(this.uploader.queue[i]);
    this.offlineFiles.splice(index,1);
  }
  isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
      if(value === arr[i]){
        return true;
      }
    }
    return false;
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  ngOnInit() {
    calc_height(document.getElementById('createTask'));
    this.route.queryParams.subscribe(params => {
      this.required1 = 0;
      this.required2 = 0;
      this.required3 = 0;
      if((params['taskName'])!=undefined){
        this.taskTitle = params['taskTitle'];
        this.taskName = params['taskName'];
        this.choose = params['fileType'];
        this.choosed = params['fileType'];
        this.warnRule = '';
        this.warnRuleId = '';
        //this.inputPath = params['inputPath'];
        //console.log(this.inputPath);
        //this.fileNames = params['fileNames'];
        if(params['alarmRules']){
          this.warnRuleArr = JSON.parse(params['alarmRules']);
          this.warnChanChecked = this.warnRuleArr;
        }
        this.taskId = params['taskId'];
        for(let i=0;i<this.warnRuleArr.length;i++){
          if(this.warnRule==''){
            this.warnRule = this.warnRuleArr[0].ruleName;
          }else{
            this.warnRule += ','+this.warnRuleArr[i].ruleName;
          }
          if(this.warnRuleId==''){
            this.warnRuleId = this.warnRuleArr[0].ruleId;
          }else{
            this.warnRuleId += ','+this.warnRuleArr[i].ruleId;
          }
        }
        /*        for(let j=0;j<this.offlineFiles.length;j++){

         }*/
        /*        console.log(this.fileNames);
         if(this.fileNames){
         this.showName = this.fileNames.split(',');
         }*/
        if(this.taskId){
          this.offlineService.getSize(this.taskId)
            .subscribe(result=>{
              //console.log(result);
              //console.log(result);
              let name:string='';
              let path:string='';
              for(let i=0;i<result.offlineFiles.length;i++){
                this.fileObj = {};
                this.fileObj.fileName = result.offlineFiles[i].fileName;
                name +=result.offlineFiles[i].fileName+',';
                this.fileObj.inputPath = result.offlineFiles[i].inputPath;
                path +=result.offlineFiles[i].inputPath+',';
                this.fileObj.size = result.offlineFiles[i].fileSize;
                this.showFile.push(this.fileObj);
              }
            })
        }
        this.lookIndex = 1;
      }
    });

  }
  deleteChange(event){
    this.deleteIndex = event;
  }
  create(){
    if(!this.taskName){
      this.required1 = 1;
      return false;
    }else{
      this.required1 = 0;
    }
    if(!this.warnRule){
      this.required2 = 1;
      return false;
    }else{
      this.required2 = 0;
    }
    if(this.uploader.queue.length==0){
      this.required3 = 1;
      return false;
    }else{
      this.required3 = 0;
    }
    for(let i=0;i<this.uploader.queue.length;i++){
      if(this.uploader.queue[i].progress!=100){
        this.required3 = 1;
        return false;
      }else{
        this.required3 = 0;
      }
    }
    this.fileNumber = this.uploader.queue.length;
    //console.log(this.offlineFiles);

    this.offlineService.create(this.appId,this.warnRuleId,this.taskName,this.choosed,this.offlineFiles,this.fileNumber)
      .subscribe(result=>{
        this.router.navigate(['../taskmanage']);
      })
  }
  warnChanCheckedChange(event){
    this.warnChecked = event;
  }
  chanChange(event){
    this.warnRule = event.join(',');
  }
  chanChangeId(event){
    this.warnRuleId = event.join(',');
  }
  update(){
    if(!this.taskName){
      this.required1 = 1;
      return false;
    }else{
      this.required1 = 0;
    }
    if(!this.warnRule){
      this.required2 = 1;
      return false;
    }else{
      this.required2 = 0;
    }
    if(this.offlineFiles.length==0&&this.showFile.length==0){
      this.required3 = 1;
      return false;
    }else{
      this.required3 = 0;
    }
    if(this.showFile.length!=0){
      for(let i=0;i<this.showFile.length;i++){
        this.offlineFiles.unshift(this.showFile[i]);
      }
    }
    for(let j=0;j<this.offlineFiles.length;j++){
      let obj = {};
      obj = { "fileName":this.offlineFiles[j].fileName,"inputPath":this.offlineFiles[j].inputPath };
      this.upOfflineFiles.push(obj);
    }
    //console.log(this.upOfflineFiles);
    this.offlineService.update(this.warnRuleId,this.taskId,this.upOfflineFiles,this.choosed,this.taskName,this.upOfflineFiles.length)
      .subscribe(result=>{
        //console.log(result);
        this.router.navigate(['../taskmanage']);
      })
  }
  checkedRules(e:any){
    this.checked=1;
    let oev = e || event;
    oev.preventDefault();
    oev.stopPropagation();
    return false;
  }

  hide(){
    this.checked = 0;
  }
  deleteUploader(){
    if(this.showFile.length==0){
      if(this.choose!=this.choosed&&this.showArr.length>0){
        this.choose = this.choosed;
        return false
      }else{
        return true
      }
    }else{
      if(this.choose!=this.choosed){
        this.choose = this.choosed;
        return false
      }else{
        return true
      }
    }
  }
  getTipContent(){
    this.deleteIndex =1;
    this.tip_title = '提示';
    this.tip_content = '对不起，您已上传文件，请先删除！';
  }
  checkRadio(type){
    if(type=='video'){
      this.choose = 'video';
      if(this.deleteUploader()){
        this.choosed = 'video';
      }else{
        this.getTipContent();
        return false
      }
    }else if(type=='image'){
      this.choose = 'image';
      if(this.deleteUploader()){
        this.choosed = 'image';
      }else{
        this.getTipContent();
        return false
      }
    }else if(type=='zip'){
      this.choose = 'zip';
      if(this.deleteUploader()){
        this.choosed = 'zip';
      }else{
        this.getTipContent();
        return false
      }
    }
  }
}
