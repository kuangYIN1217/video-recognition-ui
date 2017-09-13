/**
 * Created by Administrator on 2017/6/15 0015.
 */
import { Component } from '@angular/core';
import {Headers} from "@angular/http";
import {AppManageService} from "app/common/services/appmanage.service";
import {FileItem, FileUploader} from "ng2-file-upload";
import {SERVER_URL} from "app/app.constants";
import {appManageInfo} from "../common/defs/resources";
import {Router} from "@angular/router";
import {stringify} from "querystring";
import {calc_height} from "../common/ts/calc_height";
declare var $:any;
@Component({
  selector: 'app-manage',
  styleUrls: ['./css/appmanage.component.css'],
  templateUrl: './templates/appmanage.html',
  providers: [AppManageService]
})
export class AppManageComponent {
  SERVER_URL = SERVER_URL;
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
  photoRequired:number=0;
  applicationChannels:any[]=[];
  radioIndex:number=1;
  excel:number=1;
  progress:number=0;
  importPath:string;
  id1:any;
  id2:any;
  type1:string;
  type2:string;
  realTime:any[]=[];
  offline:any[]=[];
  url:any;
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  requiredFile:number=0;
  createFlag:boolean=true;
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
  Headers: Headers = this.appManageService.getHeaders();
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });

  selectedFileOnChanged(event:any) {
    console.log(event.target.value);
    this.upload();
/*    if(this.btnIndex==0){
      $('#image').attr('src','');
    }else if(this.btnIndex==1){
      $('#updateImage').attr('src','');
    }
    let len = this.uploader.queue.length-1;
    let file = this.uploader.queue[len]._file;
    let reader  = new FileReader();
    if(this.btnIndex==0){
    reader.addEventListener("load", function () {
      $('#image').attr('src',reader.result);
    }, false);
    }else if(this.btnIndex==1){
      reader.addEventListener("load", function () {
        $('#updateImage').attr('src',reader.result);
      }, false);
    }
    if (file) {
      reader.readAsDataURL(file);
    }*/
  }
  getAllInfo(){
    this.appManageService.getAppInfo()
      .subscribe(result=>{
        // this.appManageInfo = result;
        this.id1="";
        this.id2="";
        this.type1="";
        this.type2="";
          for(let i in result){
            if(result[i].applicationType=="实时流分析"){
              if(!this.id1){
                this.id1 = result[i].applicationId;
                this.type1 = result[i].applicationType;
              }else{
                this.id1 += ','+result[i].applicationId;
              }
            }else if(result[i].applicationType=="离线文件分析")
              if(!this.id2){
                this.id2 = result[i].applicationId;
                this.type2 = result[i].applicationType;
              }else{
                this.id2 += ','+result[i].applicationId;
              }
          };
          if(this.type1){
            this.appManageService.getAllDate(this.type1,this.id1)
             .subscribe(date=>{
               this.realTime = date;
             });
          }
        if(this.type2){
          this.appManageService.getAllDate(this.type2,this.id2)
           .subscribe(date=>{
             this.offline = date;
           });
        }

/*        this.appManageService.getAllDate("实时流分析",id1)
         .subscribe(date=>{
         });*/

        /*            this.appManageService.getAllDate("离线文件分析",id2)
         .subscribe(date=>{

         });*/
      });
  }
  download(){
      // this.appManageService.downTemplate()
      //   .subscribe(result=>{
      //     this.url = result.url;
      //     location.href = this.url;
      //   })
    window.open(SERVER_URL+"/template.xlsx");
  }
  categoryChange(){
    if(this.appCate=="实时流分析"){
      this.channel=0;
    }else{
      this.channel=1;
    }
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
  createInput(){
    let appName = this.appName;
    let appCate = this.appCate;
    for(let i in this.arr){
      this.arr[i].channelProtocol = "RTMP";
      if(!this.arr[i].channelName||this.arr[i].channelName==''){
        this.arr[i].flag=1;
        return false;
      }else{
        this.arr[i].flag=2;
      }
      if(!this.arr[i].channelAddress||this.arr[i].channelAddress==''){
        this.arr[i].flag1=1;
        return false;
      }else{
        this.arr[i].flag1=2;
      }
    }
    this.appManageService.createApp(appName,appCate,this.arr,null)
      .subscribe(result=>{
        this.createFlag = true;
        console.log(result);
        this.createApp='manage';
        this.getAllInfo();
      });
  }
  deleteChange(event){
    this.deleteIndex = event;
  }
  createImport(){
    let appName = this.appName;
    let appCate = this.appCate;
    this.appManageService.createApp(appName,appCate,null,this.importPath)
      .subscribe(result=>{
        this.createFlag = true;
        if(result.map.num[0]>0){
          //console.log(typeof result.map.num[0]);
          this.deleteIndex =1;
          this.tip_title = '提示';
          this.tip_content = '无效数据，第'+(result.map.num[0]+1)+'行导入失败！';
          //return
          this.createApp='manage';
          this.getAllInfo();
        }else {
          //console.log(result.map.set.length);
          if(result.map.set.length==0){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '没有导入条通道！';
            return
          }
          this.deleteIndex =1;
          this.tip_title = '提示';
          this.tip_content = '成功导入'+result.map.set.length+'条通道！';
        }
        this.createApp='manage';
        this.getAllInfo();
      });
  }
  createOffline(){
    let appName = this.appName;
    let appCate = this.appCate;
    this.appManageService.createApp(appName,appCate,null,null)
      .subscribe(result=>{
        this.createFlag = true;
        console.log(result);
        this.createApp='manage';
        this.getAllInfo();
      });
  }
  editTitle(item){
    if(item.flag==undefined||item.flag!=1){
      this.appName = item.applicationName;
      item.flag=1;
    }
  }
  updateName(item){
    this.appId = item.applicationId;
    this.appCate = item.applicationType;
    console.log(this.appName);
    this.appManageService.updateApp(this.appId,this.appName)
      .subscribe(result=>{
        console.log(result);
      this.getAllInfo();
      });
    setTimeout(() => item.flag=2, 1000);
  }
  upload(){
    this.uploader.queue[0].upload(); // 开始上传
    this.uploader.onProgressItem=(fileItem: FileItem, progress: any)=>{
      this.progress=0;
      if(progress==100){
        setTimeout(()=>{
          fileItem.headers.flag=1;
        }, 300);
      }
    };
    this.uploader.queue[0].onSuccess = (response: any, status: any, headers: any) => {
      this.importPath = response;
    }
  }
  create(){
    if(!this.createFlag) {
      return;
    }
    this.createFlag = false;
    if(!this.appName){
      this.required = 1;
      return false;
    }else if(this.appCate=='实时流分析'){
      if(this.excel==1){
        this.required = 0;
        this.createInput();
      }else if(this.excel==0){
        this.required = 0;
        if(this.uploader.queue.length==0||!this.uploader.queue){
          this.importPath = '';
          this.requiredFile = 1;
          return false;
        }else{
          this.requiredFile = 0;
        }
        this.createImport();
      }
    }else if(this.appCate=='离线文件分析'){
        this.required = 0;
        this.createOffline();
    }
  }
  ngOnInit() {
    calc_height(document.getElementById('appManage'));
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
    this.uploader.queue[0].onSuccess = (response: any, status: any, headers: any) => {
      this.uploader.queue[0].remove();
      this.icon = response;
/*      this.appManageService.updateApp(this.appId,this.appName,this.appCate,this.createTime,this.icon)
        .subscribe(result=>{
          this.createApp='manage';
          this.getAllInfo();
        })*/
    }
    this.uploader.queue[0].upload(); // 开始上传
  }
  back(){
    this.createApp='manage';
    this.createFlag = true;
  }
  createJob(){
    this.appName = '';
    this.icon = '';
    this.arr=[{}];
    //$('#image').attr('src','');
    this.btnIndex = 0;
    this.createApp = 'create';
    this.channel = 0;
    this.appCate = this.appCates[0];
    this.protocol = this.protocols[0];
    if(this.uploader.queue.length>0){
      this.uploader.queue[0].remove();
    }
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
  radio(i){
    this.radioIndex = i;
    if(this.radioIndex==1){
      this.excel=1;
    }else if(this.radioIndex==0){
      this.excel=0;
    }
  }
  gotoAppmanage () {
    this.createApp = 'manage';
  }
  jump(item){
    if(item){
      console.log(item);
      sessionStorage.setItem("applicationId" , item.applicationId);
      sessionStorage.setItem("applicationName" , item.applicationName);
      sessionStorage.setItem("applicationType" , item.applicationType);
    }
  }
}
