/**
 * Created by Administrator on 2017/6/20 0020.
 */
import { Component } from '@angular/core';
import {ChannelService} from "../../common/services/channel.service";
import {channelInfo} from "../../common/defs/resources";
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
  radioIndex:number=0;
  allFlag:boolean=false;
  btnIndex:number=0;
  chanId:number;
  chanStatus:string;
  flag:number;
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
    this.protocol = '';
    this.chanId = 0;
    this.chanStatus = '';
  }
  output(index){
    if(index==0){
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
        return false;
    }else{
      this.addDialog = 1;
      this.btnIndex = 1;
      this.chanName = item.channelName;
      this.chanAddr = item.channelAddress;
      this.protocol = item.channelProtocol;
      this.chanId = item.channelId;
      this.chanStatus = item.channelStatus;
      console.log(this.chanStatus);
    }

  }
  editSave(){
    this.addDialog = 0;
    console.log(this.chanStatus);
    this.channelService.updateChannel(this.chanId,this.chanName,this.chanAddr,this.protocol,this.chanStatus)
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

}
