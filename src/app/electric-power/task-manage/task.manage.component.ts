import { Component } from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
import {Page} from "app/common/defs/resources";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  selector: 'electric-task-manage',
  styleUrls: ['./task.manage.component.css'],
  templateUrl: './task.manage.html',
  providers: [ElectricService]
})

export class ElecTaskManageComponent {
  appId:string;
  taskName:any='';
  status:any='';
  page: number = 0;
  pageMaxItem: number = 10;
  pageParams = new Page();
  taskStatusArr:any[]=["全部","完成","进行中","未启动","暂停"];
  taskInfo:any[]=[];
  all_selected:boolean = false;
  constructor(private electricService:ElectricService,private route: ActivatedRoute ,private router: Router) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.status = this.taskStatusArr[0];
    this.getTask(this.appId,-1,-1,this.page,this.pageMaxItem);
  }
  getTask(appId,name,status,page,size){
    this.electricService.searchTask(appId,name,status,page,size)
      .subscribe(result=>{
        this.taskInfo = result.content;
      })
  }
  getFlaw(arr){
    let temName = '';
    for(let i=0;i<arr.length;i++){
      temName += arr[i].flawName + ',';
    }
    return temName.substring(0,temName.length-1);
  }
  checkAll(){
    this.all_selected = !this.all_selected;
    if(this.all_selected){
      for(let i=0;i<this.taskInfo.length;i++){
        this.taskInfo[i].selected = true;
      }
    }else{
      for(let i=0;i<this.taskInfo.length;i++){
        this.taskInfo[i].selected = !this.taskInfo[i].selected;
      }
    }
  }
  check(index){
    if (this.all_selected) {
      this.all_selected = !this.all_selected;
    }
    this.taskInfo[index].selected = !this.taskInfo[index].selected;
  }
  valid(){

  }
  search(){
    this.valid();
    if(this.taskName==''&&this.status=='全部'){
      this.getTask(this.appId,-1,-1,this.page,this.pageMaxItem);
    }else if(this.taskName==''&&this.status!='全部'){
      this.getTask(this.appId,-1,this.status,this.page,this.pageMaxItem);
    }else if(this.taskName!=''&&this.status=='全部'){
      this.getTask(this.appId,this.taskName,-1,this.page,this.pageMaxItem);
    }else{
      this.getTask(this.appId,this.taskName,this.status,this.page,this.pageMaxItem);
    }
  }
  create(){
    this.router.navigate(['../createtask'],{queryParams: {'taskTitle':"新建任务"}});
  }
  edit(item){
    this.router.navigate(['../createtask'],{queryParams: {'taskId':item.taskId,'taskName':item.taskName,'flawCategorySet':JSON.stringify(item.flawCategorySet),'taskTitle':"修改任务"}});
  }
  look(item){
    //console.log(JSON.stringify(item));
    this.router.navigate(['../taskresult'],{queryParams: {'allInfo':JSON.stringify(item)}});
  }
}
