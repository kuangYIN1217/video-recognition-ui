import { Component } from '@angular/core';
import {SERVER_URL} from "app/app.constants";
import {FileUploader, FileItem} from "ng2-file-upload";
import {WarnService} from "../../common/services/warn.service";
import {OfflineService} from "../../common/services/offline.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  ruleId:string;
  showArr:any[]=[];
  progress:number=0;
  inputPathArr:any[]=[];
  inputPath:string;
  fileName:string;
  fileNameArr:any[]=[];
  fileNumber:number;
  tasklist:any={};
  constructor(private warnService: WarnService,private offlineService: OfflineService,private router:Router,private route: ActivatedRoute) {
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
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });
  selectedFileOnChanged(){
    console.log(this.uploader.queue);
    for(let j=0;j<this.uploader.queue.length;j++){
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
        this.inputPathArr.push(response);
        this.fileNameArr.push(this.uploader.queue[j].file.name);
        if(j==this.uploader.queue.length-1){
        this.inputPath = this.inputPathArr.join(',');
        this.fileName = this.fileNameArr.join(',');
        }
      };
      this.uploader.queue[j].upload();
    }
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
    this.inputPathArr.splice(index,1);
    this.fileNameArr.splice(index,1);
    this.inputPath = this.inputPathArr.join(',');
    this.fileName = this.fileNameArr.join(',');
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
    this.route.queryParams.subscribe(params => {
        this.tasklist = params['task'];
    });
  }
  create(){
    if(!this.taskName){
      this.required = 1;
      return false;
    }
    if(!this.warnRule){
      this.required = 1;
      return false;
    }
    if(this.uploader.queue.length==0){
      this.required = 1;
      return false;
    }
    for(let i in this.warnChanArr){
      if(this.ruleId==undefined){
        this.ruleId = this.warnChanArr[0].ruleId;
      }else{
        this.ruleId += ','+this.warnChanArr[i].ruleId;
      }
    }
    console.log(this.ruleId);
    this.fileNumber = this.uploader.queue.length;
    this.offlineService.create(this.appId,this.ruleId,this.taskName,this.inputPath,this.fileName,this.fileNumber)
      .subscribe(result=>{
        console.log(result);
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
  checkedRlues(){
    if(this.checked==0){
      this.checked=1;
    }else{
      this.checked=0;
    }
  }
}
