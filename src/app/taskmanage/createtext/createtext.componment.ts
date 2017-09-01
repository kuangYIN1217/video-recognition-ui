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
  constructor(private warnService: WarnService,private offlineService: OfflineService,private router:Router,private route: ActivatedRoute) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    console.log(this.appId);
    console.log(this.appCate);
    this.warnService.getWarnRules(this.appId)
      .subscribe(result=>{
        this.warnChanArr = result.content;
        //this.warnRule = this.warnChanArr[0].ruleName;
        console.log(this.warnChanArr);
      })
  }
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });
  selectedFileOnChanged(){
    console.log(this.uploader.queue);
    for(let j=0;j<this.uploader.queue.length;j++){
      this.size = this.uploader.queue[j].file.size;
      if((this.size/1024/1024)>500){
        this.deleteIndex =1;
        this.tip_title = '提示';
        this.tip_content = this.uploader.queue[j].file.name +'文件大于500M！';
        return false;
      }
      if(Number(j)>4){
        this.uploader.queue[5].remove();
        j-=1;
        continue
      }else{
        let bool = this.isInArray(this.showArr,this.uploader.queue[j]);
        if(bool==false){
          this.showArr.push(this.uploader.queue[j]);
          this.getProgress(j);
          //this.getSuccess(j);
        }else{
          continue;
        }
      }
    }
    //this.uploader.queue[0].upload();
  }
  getProgress(j){
    if(j>4){
      this.showArr.splice(5,1);
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
        console.log(response);
        this.offlineObj = { "fileName":this.uploader.queue[j].file.name,"inputPath":response };
        this.offlineFiles.push(this.offlineObj);
/*        this.inputPathArr.push(response);
        this.fileNameArr.push(this.uploader.queue[j].file.name);
        if(j==this.uploader.queue.length-1){
        this.inputPath = this.inputPathArr.join(',');
        this.fileName = this.fileNameArr.join(',');
        }*/
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
/*    this.inputPathArr.splice(index,1);
    this.fileNameArr.splice(index,1);
    this.inputPath = this.inputPathArr.join(',');
    this.fileName = this.fileNameArr.join(',');*/
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
      if(JSON.stringify(params) != "{}"){
        this.taskTitle = params['taskTitle'];
        this.taskName = params['taskName'];
        this.warnRule = '';
        this.warnRuleId = '';
        //this.inputPath = params['inputPath'];
        //console.log(this.inputPath);
        //this.fileNames = params['fileNames'];
        if(params['alarmRules']){
          this.warnRuleArr = JSON.parse(params['alarmRules']);
          console.log(this.warnRuleArr);
        }
/*        if(params['offlineFiles']){
          this.offlineFiles = JSON.parse(params['offlineFiles']);
        }*/
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
            console.log(result);
            let name:string='';
            let path:string='';
            for(let i=0;i<result.fileSize.length;i++){
              this.fileObj = {};
              this.fileObj.fileName = result.offlineTasks.offlineFiles[i].fileName;
              name +=result.offlineTasks.offlineFiles[i].fileName+',';
              this.fileObj.inputPath = result.offlineTasks.offlineFiles[i].inputPath;
              path +=result.offlineTasks.offlineFiles[i].inputPath+',';
              this.fileObj.size = result.fileSize[i];
              this.showFile.push(this.fileObj);
            }
            console.log(this.showFile);
/*            this.fileNames = name.substring(0,name.length-1);
            this.inputPath = path.substring(0,path.length-1);
            console.log(this.fileNames);
            console.log(this.inputPath);*/
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
/*    for(let i in this.warnChanArr){
      if(this.ruleId==undefined){
        this.ruleId = this.warnChanArr[0].ruleId;
      }else{
        this.ruleId += ','+this.warnChanArr[i].ruleId;
      }
    }*/
    //console.log(this.ruleId);
    this.fileNumber = this.uploader.queue.length;
    console.log(this.warnRuleId);
    console.log(this.offlineFiles);
    this.offlineService.create(this.appId,this.warnRuleId,this.taskName,this.offlineFiles,this.fileNumber)
      .subscribe(result=>{
        console.log(result);
        this.router.navigate(['../taskmanage']);
      })
  }
  chanChange(event){
    this.warnRule = event.join(',');
    console.log(this.warnRule);
  }
  chanChangeId(event){
    this.warnRuleId = event.join(',');
    console.log(this.warnRuleId);
  }
  update(){
    debugger
    console.log(this.warnRuleId);
    /*  let tem:any[]=[];
    let temp:any[]=[];
    tem = this.inputPath.split(',');
    for(let i=0;i<tem.length;i++){
      this.inputPathArr.unshift(tem[i]);
    }
    temp = this.fileNames.split(',');
    for(let i=0;i<temp.length;i++){
      this.fileNameArr.unshift(temp[i]);
    }
    this.inputPath = this.inputPathArr.join(',');
    this.fileName = this.fileNameArr.join(',');
    this.fileNumber = this.inputPathArr.length;*/
    if(this.showFile.length!=0){
      for(let i=0;i<this.showFile.length;i++){
        this.offlineFiles.unshift(this.showFile[this.showFile.length-1]);
      }
    }
    for(let j=0;j<this.offlineFiles.length;j++){
      let obj = {};
      obj = { "fileName":this.offlineFiles[j].fileName,"inputPath":this.offlineFiles[j].inputPath };
      this.upOfflineFiles.push(obj);
    }
    console.log(this.upOfflineFiles);
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
    if(this.offlineFiles.length==0){
      this.required3 = 1;
      return false;
    }else{
      this.required3 = 0;
    }
    this.offlineService.update(this.warnRuleId,this.taskId,this.upOfflineFiles,this.taskName,this.fileNumber)
      .subscribe(result=>{
        console.log(result);
        this.router.navigate(['../taskmanage']);
      })
  }

  checkedRlues(e){
    var oev = e || event;
    this.checked=1;
    oev.preventDefault();
    oev.stopPropagation();
    return false;
  }
  hide(){
    this.checked = 0;
  }
}
