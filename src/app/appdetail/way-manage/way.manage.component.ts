/**
 * Created by Administrator on 2017/6/20 0020.
 */
import { Component } from '@angular/core';
import {ChannelService} from "../../common/services/channel.service";
import {channelInfo, Page} from "../../common/defs/resources";
import {AppManageService} from "../../common/services/appmanage.service";
import {ActivatedRoute , Router} from '@angular/router'
import {SERVER_URL} from "../../app.constants";
import {FileItem, FileUploader} from "ng2-file-upload";
import {calc_height} from "../../common/ts/calc_height";
declare var $:any;
@Component({
  selector: 'way-manage',
  styleUrls: ['./css/way.manage.component.css'],
  templateUrl: './template/way.manage.component.html',
  providers: [AppManageService,ChannelService]
})
export class WayManageComponent {
  ChannelService: any;
  popup_title: string = '新增通道';
  addDialog:number=0;
  protocols:any[]=[];
  protocol:string;
  chanName:string;
  chanAddr:string;
  radioIndex:number;
  allFlag:boolean=false;
  btnIndex:number=0;
  chanId:number;
  chanOrder:number;
  chanStatus:string;
  flag:number;
  delSysDialog:number=0;
  delDialog:number=0;
  order:number=0;
  channelInfo: any[] = [];
  appId:string;
  dire:string;
  pageParams = new Page();
  page: number = 1;
  pageMaxItem: number = 10;
  switchArr1:any[]=[];
  switchArr2:any[]=[];
  chanRequired1:number=0;
  chanRequired2:number=0;
  search:string;
  show:number=1;
  status:string;
  channelName:any;
  statusCode:any;
  channelType:string;
  channelTypes:any[]=[];
  statusArr:any[]=["全部","开启","关闭"];
  videoAddress:any;
  createFlag:boolean=true;
  upadteFlag:boolean=true;
  url:string;
  deleteIndex:number=0;
  tip_title:string;
  tip_content:string;
  importPath:string;
  init_flag:boolean = true;
  constructor(private appManageService: AppManageService,private channelService: ChannelService , private route: ActivatedRoute , private router: Router) {
/*    this.route.params.subscribe((param) => {
      console.log(param);
    })*/
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appManageService.getProtocol()
      .subscribe(protocols=>{
        this.protocols=protocols;
      });
    this.channelService.getChannelType()
      .subscribe(result=>{
        this.channelTypes=result;
      });
    this.status = this.statusArr[0];
    console.log(this.status);
    this.route.params.subscribe((param) => {
      if(JSON.stringify(param) != "{}"){
        console.log(param);
        this.status = param['status'];
        console.log(this.status);
        this.searchResult();
        //this.status = param;
      }
    });
    if(this.status=='全部'){
      this.getPages(this.appId,this.page-1,this.pageMaxItem);
    }
  }
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });
  ngOnInit() {
    calc_height(document.getElementById('channelContent'));
    this.route.queryParams.subscribe(params => {
        this.statusCode = params['statusCode'];
    });
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  check(item){
    if(item.flag!=1){
      item.flag=1;
    }else{
      item.flag=2;
      this.allFlag=false;
    }
    for(var i in this.channelInfo){
      if(this.channelInfo['flag']!=1){
        this.allFlag=false;
        return;
      }else{
        this.allFlag=true;
      }
    }
  }
  searchResult(){
    if(!this.channelName){
      this.channelName=null;
    }
    if(this.status=="开启"){
      this.statusCode = 1;
    } else if(this.status=="关闭"){
      this.statusCode = 0;
    }else{
      this.statusCode = null;
    }
    this.channelService.searchResult(this.appId,this.channelName,this.statusCode,this.page-1,this.pageMaxItem)
      .subscribe(result=>{
        if(result.content){
          this.channelInfo=result.content;
          console.log(this.channelInfo);
          let page = new Page();
          page.pageMaxItem = result.size;
          page.curPage = result.number+1;
          page.totalPage = result.totalPages;
          page.totalNum = result.totalElements;
          //page.statusCode = this.statusCode;
          this.pageParams = page;
          console.log(this.pageParams);
        }
      })
  }
  // searchChannel(){
  //   this.channelService.searchChannel(this.appId,this.search,this.page-1,this.pageMaxItem)
  //     .subscribe(result=>{
  //       console.log(result);
  //       this.channelInfo = result.content;
  //       let page = new Page();
  //       page.pageMaxItem = result.size;
  //       page.curPage = result.number+1;
  //       page.totalPage = result.totalPages;
  //       page.totalNum = result.totalElements;
  //       this.pageParams = page;
  //     });
  // }
  getPageData(paraParam) {
    this.getPages(this.appId,paraParam.curPage-1,paraParam.pageMaxItem);
    console.log(this.statusCode);
  }
  getPages(id,page,size){
    this.channelService.getPage(id,page,size)
      .subscribe(result => {
        console.log(result);
        this.channelInfo = result.content;
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      });
  }
  allSel(){
    for(var i in this.channelInfo){
      if(this.allFlag==false){
        this.channelInfo[i]['flag']=1;
      }else{
        this.channelInfo[i]['flag']=2;
      }
    }
    if(this.allFlag==false){
      this.allFlag=true;
    }else{
      this.allFlag=false;
    }
  }
  download(){
    window.open(SERVER_URL+"/template.xlsx");
  }
  selectedFileOnChanged(event:any) {
    this.uploader.queue[0].isReady = true;
    if(this.uploader.queue.length==0){
      return
    }else{
    this.uploader.queue[0].upload(); // 开始上传
    this.uploader.queue[0].onSuccess = (response: any, status: any, headers: any) => {
      console.log(response);
      this.channelService.getImport(response,this.appId)
        .subscribe(result=>{
          if(result.map.num[0]>0){
            //console.log(typeof result.map.num[0]);
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '无效数据，第'+(result.map.num[0]+1)+'行导入失败！';
          }else {
            //console.log(result.map.set.length);
            if(result.map.set.length==0){
              this.deleteIndex =1;
              this.tip_title = '提示';
              this.tip_content = '没有导入条通道！';
              this.uploader.queue[0].remove();
              return
            }
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '成功导入'+result.map.set.length+'条通道！';
          }
          event.target.value='';
          this.uploader.queue[0].remove();
          this.getPages(this.appId,this.page-1,this.pageMaxItem);
        })
    }
  }
  }
  dia(){
    for(let i in this.channelInfo){
      if(this.channelInfo[i]['flag'] == '1'&&this.channelInfo[i].channelStatus=='1'){
        console.log(this.channelInfo[i].channelStatus);
        this.delSysDialog =1;
        return false;
      }else if(this.channelInfo[i]['flag'] == '1'&&this.channelInfo[i].channelStatus=='0'){
        console.log(this.channelInfo[i].channelStatus);
        this.delDialog =1;
      }
    }
  }
  delete(){
    for(let i in this.channelInfo){
      if(this.channelInfo[i]['flag'] == '1'&&this.channelInfo[i].channelStatus=='1'){
        console.log(this.channelInfo[i].channelStatus);
        this.delSysDialog =1;
        return false;
      }else if(this.channelInfo[i]['flag'] == '1'&&this.channelInfo[i].channelStatus=='0'){
      this.delChannel(this.channelInfo[i].channelId);
      }
    }
  }
  delChannel(id){
    this.channelService.delChannel(id)
      .subscribe(result=>{
        this.delDialog = 0;
        this.getPages(this.appId,this.page-1,this.pageMaxItem);
      })
  }
  radio(i){
    this.radioIndex = i;
  }
  addChannel(){
    this.popup_title = '新增通道';
    this.addDialog = 1;
    this.btnIndex = 0;
    this.protocol = this.protocols[0];
    this.channelType = this.channelTypes[1];
    this.chanName = '';
    this.chanAddr = '';
    this.videoAddress = '';
    this.chanStatus = '1';
    this.radioIndex = 1;
  }
  output(index){
    if(index==1){
      return '开';
    }else{
      return '关';
    }
  }
  create(){
      let chanAddr = this.chanAddr;
      let chanName = this.chanName;
      let protocol = this.protocol;
      let channelType = this.channelType;
      let videoAddress = this.videoAddress;
      let status =  this.radioIndex;
      if(!chanName||chanName==''){
        this.chanRequired1 = 1;
        return false;
      }else{
        this.chanRequired1 = 0;
      }
    if(!chanAddr||chanAddr==''){
      this.chanRequired2 = 1;
      return false;
    }else{
      this.chanRequired2 = 0;
    }
      //console.log(chanName,chanAddr);
      this.show = 0;
    if(!this.createFlag) {
      return;
    }
    this.createFlag = false;
      this.channelService.createChannel(this.appId,chanAddr,chanName,protocol,channelType,videoAddress,status)
        .subscribe(result=>{
          console.log(result);
          if(result.text()=='NO'){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '该通道地址已存在，画面顺序为'+result.text().substring(3)+'！';
          }else{
            this.show=1;
            this.addDialog = 0;
            this.getPages(this.appId,this.page-1,this.pageMaxItem);
            this.createFlag = true;
          }
        })
  }
  edit(item){
    console.log(item);
    if(item.channelStatus==1){
        return false;
    }else{
      this.popup_title = '修改通道';
      this.addDialog = 1;
      this.btnIndex = 1;
      this.chanName = item.channelName;
      this.chanAddr = item.channelAddress;
      this.protocol = item.channelProtocol;
      this.channelType = item.channelType;
      this.videoAddress = item.videoAddress;
      this.chanId = item.channelId;
      this.chanOrder = item.channelOrder;
      this.chanStatus = item.channelStatus;
      if(this.chanStatus=='1'){
        this.radioIndex = 1;
      }else{
        this.radioIndex = 0;
      }
  }
  }
  editSave(){
    if(this.chanName==''){
      this.chanRequired1 = 1;
      return false;
    }else{
      this.chanRequired1 = 0;
    }
    if(this.chanAddr==''){
      this.chanRequired2 = 1;
      return false;
    }else{
      this.chanRequired2 = 0;
    }
    if(!this.upadteFlag){
      return
    }
    this.upadteFlag = false;
    this.channelService.updateChannel(this.appId,this.chanId,this.chanOrder,this.chanName,this.chanAddr,this.protocol,this.channelType,this.videoAddress,this.radioIndex)
      .subscribe(result=>
      {
        if(result.text().substring(0,2)=='NO'){
          this.deleteIndex =1;
          this.tip_title = '提示';
          this.tip_content = '该通道地址已存在，画面顺序为'+result.text().substring(3)+'！';
        }
        this.getPages(this.appId,this.page-1,this.pageMaxItem);
        this.addDialog = 0;
        this.upadteFlag = true;
      })
  }
  runChannel(item){
    let j=0;
    if(item.channelStatus==0){
      for(let i=0;i<this.channelInfo.length;i++){
        if(this.channelInfo[i].channelStatus==1){
          j++;
          if(j>8){
            this.deleteIndex =1;
            this.tip_title = '提示';
            this.tip_content = '对不起，通道开启数超过9个，请先关闭其他通道！';
            return
          }
        }
      }
      item.channelStatus=1;
    }else if(item.channelStatus==1){
      item.channelStatus=0;
    }
    this.channelService.run(item.channelId,item.channelStatus)
      .subscribe(reply => this.start_reply(reply));
  }
  start_reply(reply){
    if(reply.status==200){
      console.log("Start Successfully!");
    }else{
      console.log("Start Failed!");
    }
    //this.getPages(this.appId,this.page-1,this.pageMaxItem);
  }
  cancel(){
    this.addDialog = 0;
    this.delSysDialog = 0;
    this.delDialog = 0;
  }
  deleteChange(event){
    this.deleteIndex = event;
  }
  dirRecord(id,direction){
    if(direction == 1){
      this.dire='up';
    }else if(direction == 2){
      this.dire='down';
    }
    this.channelService.getDirection(id,this.dire)
      .subscribe(result=>{
        this.getPages(this.appId,this.page-1,this.pageMaxItem);
      });
  }
findStatus(){
  this.switchArr1=[];
  this.switchArr2=[];
  for(let i in this.channelInfo){
    if(this.channelInfo[i].channelStatus==0){
      this.switchArr1.push(this.channelInfo[i]);
    }else{
      this.switchArr2.push(this.channelInfo[i]);
    }
  }
  return this.switchArr1,this.switchArr2;
}
  sortByType(){
    if(this.order==0){
      this.order=1;
      this.findStatus();
      this.channelInfo=[];
      this.channelInfo=this.switchArr2.concat(this.switchArr1);
      console.log(this.channelInfo);
    }else if(this.order==1){
      this.order=2;
      this.findStatus();
      this.channelInfo=[];
      this.channelInfo=this.switchArr1.concat(this.switchArr2);
      console.log(this.channelInfo);
    }else if(this.order==2){
      this.order=1;
      this.findStatus();
      this.channelInfo=[];
      this.channelInfo=this.switchArr2.concat(this.switchArr1);
      console.log(this.channelInfo);
    }
  }
}
