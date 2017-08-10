/**
 * Created by Administrator on 2017/6/20 0020.
 */
import { Component } from '@angular/core';
import {ChannelService} from "../../common/services/channel.service";
import {channelInfo, Page} from "../../common/defs/resources";
import {AppManageService} from "../../common/services/appmanage.service";
declare var $:any;
@Component({
  selector: 'way-manage',
  styleUrls: ['./css/way.manage.component.css'],
  templateUrl: './template/way.manage.component.html',
  providers: [AppManageService,ChannelService]
})
export class WayManageComponent {
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
  statusArr:any[]=["全部","开启","关闭"];
  constructor(private appManageService: AppManageService,private channelService: ChannelService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    console.log(this.appId);
    this.getPages(this.appId,this.page-1,this.pageMaxItem);
    this.appManageService.getProtocol()
      .subscribe(protocols=>{
        this.protocols=protocols;
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
  searchChannel(){
    this.channelService.searchChannel(this.appId,this.search,this.page-1,this.pageMaxItem)
      .subscribe(result=>{
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
  getPageData(paraParam) {
    this.getPages(this.appId,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  getPages(id,page,size){
    this.channelService.getPage(id,page,size)
      .subscribe(result => {
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
      if(this.channelInfo[i]['flag'] == 1){
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
    this.chanName = '';
    this.chanAddr = '';
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
      this.channelService.createChannel(this.appId,chanAddr,chanName,protocol,status)
        .subscribe(result=>{
          this.show=1;
          this.addDialog = 0;
          this.getPages(this.appId,this.page-1,this.pageMaxItem);
        })
  }

  edit(item){
    if(item.channelStatus==1){
        return false;
    }else{
      this.popup_title = '修改通道';
      this.addDialog = 1;
      this.btnIndex = 1;
      this.chanName = item.channelName;
      this.chanAddr = item.channelAddress;
      this.protocol = item.channelProtocol;
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
    this.channelService.updateChannel(this.appId,this.chanId,this.chanOrder,this.chanName,this.chanAddr,this.protocol,this.radioIndex)
      .subscribe(result=>{
        this.getPages(this.appId,this.page-1,this.pageMaxItem);
        this.addDialog = 0;
      })
  }
  runChannel(item){
    if(item.channelStatus==0){
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
    this.getPages(this.appId,this.page-1,this.pageMaxItem);
  }
  cancel(){
    this.addDialog = 0;
    this.delSysDialog = 0;
    this.delDialog = 0;
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
