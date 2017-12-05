import { Component } from '@angular/core';
import {ElectricService} from "../../../common/services/electric.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploader, FileItem} from "ng2-file-upload";
import {SERVER_URL} from "app/app.constants";
import {calc_height} from "../../../common/ts/calc_height";
@Component({
  selector: 'create-task',
  styleUrls: ['./createTask.component.css'],
  templateUrl: './createTask.component.html',
  providers: [ElectricService]
})

export class CreateTaskComponent {
  SERVER_URL = SERVER_URL;
  appId:string;
  checked:number=0;
  taskTitle:string='新建任务';
  title:string='已选缺陷';
  flawArr:any[]=[];
  flawCheckedArr:any[]=[];
  taskName:string='';
  required:number=0;
  flawName:string;
  flawId:string;
  pathArr:any[]=[];
  fileSize:string;
  showArr:any[]=[];
  progress:number=0;
  sizeArr:any[]=[];
  size:number=0;
  lookIndex:number=0;
  showFile:any[]=[];
  fileObj:any={};
  taskId:number;
  patrolTaskZipFileSet:any[]=[];
  upPathArr:any[]=[];
  constructor(private electricService:ElectricService,private router:Router,private route: ActivatedRoute) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.electricService.getAllFlaw()
      .subscribe(result=>{
        this.flawArr = result;
        if(this.flawCheckedArr.length>0){
          for(let i=0;i<this.flawArr.length;i++){
            for(let j=0;j<this.flawCheckedArr.length;j++){
              if(this.flawCheckedArr[j].flawId==this.flawArr[i].flawId){
                this.flawArr[i].flag=1;
              }
            }
          }
          console.log(this.flawArr);
        }
      })
  }
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/uploadPatrolZipFile",
    method: "POST",
    itemAlias: "file",
  });
  selectedFileOnChanged(){
    this.sizeArr=[];
    for(let j=0;j<this.uploader.queue.length;j++){
      this.sizeArr.push(this.uploader.queue[j].file.size);
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
  getProgress(j){
      this.uploader.onProgressItem=(fileItem: FileItem, progress: any)=>{
        this.progress=0;
        if(progress==100){
          setTimeout(()=>{
            fileItem.headers.flag=1;
          }, 300);
        }
      };
      this.uploader.queue[j].onSuccess = (response: any, status: any, headers: any) => {
        this.pathArr.push(response);
        for(let i=0;i<this.sizeArr.length;i++){
          this.size = this.size+Number(this.sizeArr[i]);
        }
        this.fileSize = this.formatSize(this.size);
        console.log(this.pathArr);
        console.log(this.fileSize);
      };
      this.uploader.queue[j].upload();
  }
  formatSize(size) {
    if (size < 1024) {
      return size + ' bytes';
    } else if (size < 1024 * 1024) {
      return (size / 1024.0).toFixed(0) + ' KB';
    } else if (size < 1024 * 1024 * 1024) {
      return (size / 1024.0 / 1024.0).toFixed(1) + ' MB';
    } else {
      return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + ' GB';
    }
  };
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
    this.pathArr.splice(index,1);
    this.sizeArr.splice(index,1);
  }
  isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
      if(value === arr[i]){
        return true;
      }
    }
    return false;
  }
  flawCheckedChange(event){
    let flaw = '';
    let flawId = '';
    for(let i=0;i<event.length;i++){
      flaw+=event[i].flawName+',';
      flawId+=event[i].flawId+',';
    }
    this.flawName = flaw.substring(0,flaw.length-1);
    this.flawId = flawId.substring(0,flawId.length-1);
  }
  create(){
    if(this.taskName==''){
      this.required = 1;
      return false;
    }else{
      this.required = 0;
    }
    if(this.flawName==''){
      this.required = 2;
      return false;
    }else{
      this.required = 0;
    }
    if(this.uploader.queue.length==0){
      this.required = 3;
      return false;
    }else{
      this.required = 0;
    }
    for(let i=0;i<this.uploader.queue.length;i++){
      console.log(this.uploader.queue[i]);
      if(this.uploader.queue[i].progress!=100){
        this.required = 3;
        return false;
      }else{
        this.required = 0;
      }
    }
    console.log(this.pathArr);
    console.log(this.fileSize);
    this.electricService.createTask(this.appId,this.pathArr,this.flawId,this.taskName,this.fileSize)
      .subscribe(
        (data)=>{
            this.router.navigate(['../electaskmanage']);
        },
        (err)=>{
          if(err.text()=='压缩包层级结构有误'){
            this.required = 4;
          }else{
            this.required = 0;
          }
        })
  }
  update(){
    if(!this.taskName){
      this.required = 1;
      return false;
    }else{
      this.required = 0;
    }
    if(!this.flawName){
      this.required = 2;
      return false;
    }else{
      this.required = 0;
    }
    if(this.pathArr.length==0&&this.showFile.length==0){
      this.required = 3;
      return false;
    }else{
      this.required = 0;
    }
    if(this.showFile.length!=0){
      for(let i=0;i<this.showFile.length;i++){
        this.pathArr.unshift(this.showFile[this.showFile.length-1].inputPath);
        this.sizeArr.unshift(this.getByte(this.showFile[this.showFile.length-1].size));
      }
      for(let i=0;i<this.sizeArr.length;i++){
        this.size = this.size+Number(this.sizeArr[i]);
      }
      this.fileSize = this.formatSize(this.size);
      console.log(this.pathArr);
      console.log(this.fileSize);
    }
    this.electricService.updateTask(this.appId,this.pathArr,this.flawId,this.taskId,this.taskName,this.fileSize)
      .subscribe(result=>{
        console.log(result);
        this.router.navigate(['../taskmanage']);
      })
  }
  getByte(item){
    if(item.substring(item.length-2,item.length-1)=='MB'){
      return (item/1024/1024).toFixed(0);
    }else if(item.substring(item.length-2,item.length-1)=='KB'){
      return (item/1024).toFixed(0);
    }else{
      return item;
    }
  }
  ngOnInit() {
    calc_height(document.getElementById('createTask'));
    this.route.queryParams.subscribe(params => {
      if(params['taskTitle']=='修改任务'){
        this.taskTitle = params['taskTitle'];
        this.taskName = params['taskName'];
        this.taskId = params['taskId'];
        this.flawCheckedArr = JSON.parse(params['flawCategorySet']);
        this.patrolTaskZipFileSet = JSON.parse(params['patrolTaskZipFileSet']);
        this.flawCheckedChange(this.flawCheckedArr);
        console.log(this.patrolTaskZipFileSet);
        for(let i=0;i<this.patrolTaskZipFileSet.length;i++){
          this.fileObj = {};
          this.fileObj.fileName = this.patrolTaskZipFileSet[i].fileName;
          this.fileObj.inputPath = this.patrolTaskZipFileSet[i].filePath;
          this.fileObj.size = this.patrolTaskZipFileSet[i].fileSize;
          this.showFile.push(this.fileObj);
        }
        console.log(this.showFile);
        this.lookIndex = 1;
      }
    });
  }
  removeArr(i){
    this.showFile.splice(i,1);
  }
  checkedFlaw(e:any){
    this.checked=1;
    let oev = e || event;
    oev.preventDefault();
    oev.stopPropagation();
    return false;
  }

  hide(){
    this.checked = 0;
  }
}
