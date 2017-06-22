/**
 * Created by Administrator on 2017/6/15 0015.
 */
import { Component } from '@angular/core';
import {AppManageService} from "app/common/services/appmanage.service";
import {FileUploader} from "ng2-file-upload";
import {SERVER_URL} from "app/app.constants";
import {appManageInfo} from "../common/defs/resources";
import {Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'app-manage',
  styleUrls: ['./css/appmanage.component.css'],
  templateUrl: './templates/appmanage.html',
  providers: [AppManageService]
})
export class AppManageComponent {
  createApp: string = "manage";
  scene:number=0;
  appName:string;
  appManageInfo: appManageInfo[] = [];
  showDialog:number=0;
  delId:number;
  btnIndex:number=0;
  createTime:string;
  appId:number;
  sceneGather:string;
  sceneGatherArr:any[]=[];
  systemShow:number=0;
  required:number=0;
  arr:any[]=[{}];
  appCates: any[] = [];
  appCate:string;
  channelName:string;
  channelAddress:string
  protocols:any[]=[];
  protocol:string;
  icon:string;
  channel:number=0;
  applicationChannels:any[]=[];
  sceneArr:any[]=[{"name":"道路识别",'flag':1}, {"name":"故障检测"}, {"name":"字母图形分类"}, {"name":"图形识别"}, {"name":"雷暴检测"}, {"name":"神经区域分割"}, {"name":"大数据回归"}];
  systemArr:any[]=[{"name":"ios",'flag':1},{"name":"Android"},{"name":"Windows"},{"name":"HTML5"},{"name":"Linux"},{"name":"其他"}];
  constructor(private appManageService: AppManageService,private router:Router) {
    this.getAllInfo();
    this.appManageService.getCategory()
      .subscribe(result=>{
          this.appCates=result;
      });
    this.appManageService.getProtocol()
      .subscribe(protocols=>{
        this.protocols=protocols;
      });
  }
  Headers:Headers = this.appManageService.getHeaders();
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });
  selectedFileOnChanged(event:any) {
    let file = this.uploader.queue[0]._file;
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      $('#image').attr('src',reader.result);
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  getAllInfo(){
    this.appManageService.getAppInfo()
      .subscribe(result=>{
        this.appManageInfo = result;
        if(this.appManageInfo.length==0){
          this.createApp = 'space';
        }
      });
  }
  start(item){
    if(item.stop==1||item.stop==undefined){
      item.stop = 0;
    }else if(item.stop==0){
      item.stop = 1;
    }
  }
  add(){
    let obj={};
    this.arr.push(obj);
/*    this.channelName = '';
    this.channelAddress='';*/
  }
  del(index){
    this.arr.splice(index,1);
  }


  create(){
    this.uploader.queue[0].onSuccess = (response: any, status: any, headers: any) => {
      this.icon = response;
      if(this.appName){
        let appName = this.appName;
        let appCate = this.appCate;
        let icon = this.icon;
        console.log(this.arr);
         /* let channelName = this.channelName;
          let channelAddress = this.channelAddress;*/
          let protocol = this.protocol;
        this.appManageService.createApp(appName,appCate,icon,this.arr)
          .subscribe(result=>{
            console.log(result);
            this.createApp='manage';
            this.getAllInfo();
          });
      }else{
        this.required = 1;
        return false;
      }
    }
    this.uploader.queue[0].upload(); // 开始上传

  }
  dia(item){
    if(item.stop==0){
      return false;
    }else {
      this.showDialog = 1;
      this.delId = item.applicationId;
    }
  }
  cancelDel(){
    this.showDialog=0;
  }
  delete(){
    this.showDialog=0;
    this.appManageService.delInfo(this.delId)
      .subscribe(result=>{
        this.getAllInfo();
      });
  }
  update(item){
    if(item.stop==0){
      return false;
    }else{
      this.createApp = 'create';
      this.btnIndex = 1;
      this.channel = 1;
      this.appName = item.applicationName;
      this.createTime = item.createTime;
      this.appId = item.applicationId;
      this.appCate = item.applicationType;
      this.icon = item.icon;
    }
  }
  updateSave(){
    this.appManageService.updateApp(this.appId,this.appName,this.appCate,this.createTime,this.icon)
      .subscribe(result=>{
        this.createApp='manage';
        this.getAllInfo();
      })
  }
  back(){
    this.createApp='manage';
  }
  createJob(){
    this.appName = '';
    this.icon = '';
    this.channelName = '';
    this.channelAddress = '';
    this.btnIndex = 0;
    this.createApp = 'create';
    this.appCate = this.appCates[0];
    this.protocol = this.protocols[0];
  }
  buyScene(){
    this.scene = 1;
  }
  goBack(){
    this.scene = 0;
  }
  check(item){
    if(!item.flag||item.flag==2){
      item.flag=1;
    }else{
      item.flag=2;
    }
  }
  sureScene(){
    this.sceneGatherArr = [];
    this.scene = 0;
    for(let i in this.sceneArr){
      if(this.sceneArr[i].flag==1){
        this.sceneGatherArr.push(this.sceneArr[i].name);
      }
    }
    this.sceneGather = this.sceneGatherArr.toString();
  }
  gotoAppmanage () {
    this.createApp = 'manage';
  }
  jump(item){
    if(item){
      localStorage.setItem("application",item);
    }
  }
}
