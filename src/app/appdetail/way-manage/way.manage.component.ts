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
  channelInfo: channelInfo[] = [];
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
  appInfo: any[] = [];
  asc:boolean=false;
  constructor(private appManageService: AppManageService,private channelService: ChannelService) {

    this.getAllChannel();
    this.appManageService.getProtocol()
      .subscribe(protocols=>{
        this.protocols=protocols;
      });
  }
  getAllChannel(){
    this.channelService.getAllChannel()
      .subscribe(result=>this.channelInfo=result);
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
/*  getPageData(paraParam) {
    this.getAlljobs(id,paraParam.curPage-1,paraParam.pageMaxItem);
    //console.log('触发', paraParam);
  }
  getAlljobs(id,page,size){
    this.channelService.getPage(id,page,size)
      .subscribe(result => {
        this.appInfo = result.content;
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      });
  }*/
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
    this.delDialog = 1;
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
        this.getAllChannel();
      })
  }
  radio(i){
    this.radioIndex = i;
  }
  addChannel(){
    this.addDialog = 1;
    this.btnIndex = 0;
    this.protocol = this.protocols[0];
    this.chanName = '';
    this.chanAddr = '';
    //this.chanOrder = 0;
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
      let chanName = this.chanName;
      let chanAddr = this.chanAddr;
      let protocol = this.protocol;
      let status =  this.radioIndex;
      this.channelService.createChannel(chanName,chanAddr,protocol,status)
        .subscribe(result=>{
          this.addDialog = 0;
          this.getAllChannel();
        })
  }
  edit(item){
    if(item.channelStatus==0){
        this.delSysDialog =1;
        return false;
    }else{
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
    this.addDialog = 0;
    console.log(this.chanStatus);
    this.channelService.updateChannel(this.chanId,this.chanOrder,this.chanName,this.chanAddr,this.protocol,this.chanStatus)
      .subscribe(result=>{
        this.getAllChannel();
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
    this.getAllChannel();
  }
  cancel(){
    this.addDialog = 0;
    this.delSysDialog = 0;
    this.delDialog = 0;
  }
  upRecord(i){
    if(i == 0) {
      return;
    }
    this.swapItems(i, i - 1);
  }
  downRecord(i){
    if(i == this.channelInfo.length -1) {
      return;
    }
    this.swapItems(i, i + 1);
  }
  swapItems(index1,index2){
    this.channelInfo[index1] = this.channelInfo.splice(index2, 1, this.channelInfo[index1])[0];
    return this.channelInfo;
  }
  sortByType(){
    if(this.order==0){
      this.order=1;
    }else if(this.order==1){
      this.order=2;
    }else if(this.order==2){
      this.order=1;
    }
   var sort='status';
    this.asc=!this.asc;
  }
}
