/**
 * Created by Administrator on 2017/6/15 0015.
 */
import { Component } from '@angular/core';
import {AppManageService} from "app/common/services/appmanage.service";
import {FileUploader} from "ng2-file-upload";
import {SERVER_URL} from "app/app.constants";
import {appManageInfo} from "../common/defs/resources";
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
  protocols:any[]=['RTMP','HLS'];
  protocol:string;
  icon:string;
  sceneArr:any[]=[{"name":"道路识别",'flag':1}, {"name":"故障检测"}, {"name":"字母图形分类"}, {"name":"图形识别"}, {"name":"雷暴检测"}, {"name":"神经区域分割"}, {"name":"大数据回归"}];
  systemArr:any[]=[{"name":"ios",'flag':1},{"name":"Android"},{"name":"Windows"},{"name":"HTML5"},{"name":"Linux"},{"name":"其他"}];
  constructor(private appManageService: AppManageService,) {
    this.getAllInfo();
    this.appManageService.getCategory()
      .subscribe(result=>{
        for(let i in result){
          this.appCates.push(result[i]);
        }
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
        console.log(result);
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
  }
  del(index){
    this.arr.splice(index,1);
  }


  create(){
    debugger
    this.uploader.queue[0].onSuccess = (response: any, status: any, headers: any) => {
      this.icon = response;
      console.log(this.icon);
    }
    this.uploader.queue[0].upload(); // 开始上传
    if(this.appName){
    let appName = this.appName;
    let appCate = this.appCate;
    let icon = this.icon;
    let channelName = this.channelName;
    let channelAddress = this.channelAddress;
    let protocol = this.protocol;
    console.log(this.icon);
    this.appManageService.createApp(appName,appCate,icon,channelName,channelAddress,protocol)
      .subscribe(result=>{
        this.createApp='manage';
        this.getAllInfo();
      });
   }else{
      this.required = 1;
      return false;
    }
  }
  dia(id){
    this.showDialog=1;
    this.delId = id;
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
    debugger
    console.log(item);
    this.createApp = 'create';
    this.btnIndex = 1;
    this.appName = item.applicationName;
    this.createTime = item.createTime;
    this.appId = item.applicationId;
    this.appCate = item.applicationType;
    this.channelAddress =item.applicationChannels[0].channelAddress;
    this.channelName =item.applicationChannels[0].channelName;
    this.protocol =item.applicationChannels[0].channelProtocol;
  }
  updateSave(){
    this.appManageService.updateApp(this.appId,this.appName,this.createTime,this.appCate,this.channelAddress,this.channelName,this.protocol)
      .subscribe(result=>{
        this.createApp='manage';
        this.getAllInfo();
      })
  }
  back(){
    this.createApp='manage';
  }
  createJob(){
    this.btnIndex = 0;
    this.createApp = 'create';
    this.appCate = this.appCates[0];
    this.changeCate();
    this.protocol = this.protocols[0];
    this.changePro();
  }
  changeCate(){
  //console.log(this.appCate);
}
  changePro(){
    //console.log(this.protocol);
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
}
