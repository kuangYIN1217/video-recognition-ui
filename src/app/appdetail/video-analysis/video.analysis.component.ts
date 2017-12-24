
/**
 * Created by Administrator on 2017/6/20 0020.
 */
import { Component } from '@angular/core';
import {ChannelService} from "../../common/services/channel.service";
import {RecognitionService} from "../../common/services/recognition.service";
import {ToastyService} from 'ng2-toasty';
import {addWarningToast , addWaitToast } from '../../common/ts/toast';
import {Page} from "../../common/defs/resources";
import {AppManageService} from "../../common/services/appmanage.service";
import {nextTick} from "q";
import {SERVER_URL} from "../../app.constants";
import {FileUploader} from "ng2-file-upload";
declare var $:any;
@Component({
  selector: 'video-analysis',
  styleUrls: ['./css/video.analysis.component.css'],
  templateUrl: './template/video.analysis.component.html',
  providers: [ChannelService , RecognitionService, AppManageService]
})
export class VideoAnalysisComoponent {
  addDialog: number=0;
  chanName: string;
  chanAddr: string;
  chanRequired1: number=0;
  chanRequired2: number=0;
  protocols: any[]=[];
  protocol: string;
  channelType: string;
  channelTypes: any []=[];
  videoAddress:any;
  radioIndex:number = 1;
  show: number = 1;
  createFlag: boolean = true;
  appId:string;
  pageParams = new Page();
  channelInfo: any[] = [];
  page: number = 1;
  pageMaxItem: number = 10;
  fullscreenIndex1:number=0;
  fullscreenIndex2:number=0;
  fullscreenIndex3:number=0;
  fullscreenIndex4:number=0;
  fullscreenIndex5:number=0;
  fullscreenIndex6:number=0;
  fullscreenIndex7:number=0;
  fullscreenIndex8:number=0;
  fullscreenIndex9:number=0;
  authority:boolean = false;
  _realTime:any[]=[];
  SERVER_URL = SERVER_URL;
  photoContainer:any[]=[];
  showFeature:number=0;
  targetSet:any[]=[];
  featureName:string='';
  arr:any[]=[{"targetFeature":"","targetImages":"","photoContainer":[]}];
  heightIndex:number = 0;
  saveSelected:any[]=[];
  saveColor:number = 0;
  fileRecognition:any[]=[];
  radio(i){
    this.radioIndex = i;
  }

  cancel(){
    this.addDialog = 0;
    this.createFlag = true;
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
        this.show = 1;
        this.addDialog = 0;
        this.getPages(this.appId,this.page-1,this.pageMaxItem);
        this.createFlag = true;
        // todo refresh
        this.initChannels()
      })
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
  /* add video end */
  ngOnInit() {
    console.log(window.navigator.plugins)
  }
  constructor (private channelService: ChannelService , private recognitionService: RecognitionService, private toastyService:ToastyService, private appManageService: AppManageService) {
    this.d_applicationId = parseInt(window.sessionStorage.getItem('applicationId'));
    this.recognitionService.getRecognitionFile(this.d_applicationId)
      .subscribe(result=>{
        console.log(result);
        this.fileRecognition = result;
      });
    /*  this._realTime = JSON.parse(window.sessionStorage.getItem("_realTime"));
   for(let i=0;i<this._realTime.length;i++){
      if(this._realTime[i].projectAuthorityId==2){
        this.authority = true;
      }
    }*/
     /* 初始化recognition */
    this.initRecognitions();
    /* 初始化channel */
    this.initChannels();

    this.appManageService.getProtocol()
      .subscribe(protocols=>{
        this.protocols=protocols;
      });
    this.channelService.getChannelType()
      .subscribe(result=>{
        this.channelTypes=result;
      });
    this.appId = window.sessionStorage.getItem("applicationId");
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
    if (navigator.plugins && navigator.plugins.length > 0) {
      var swf = navigator.plugins["Shockwave Flash"];
      if (!swf) {
        addWarningToast(this.toastyService ,"请确保安装并开启Flash权限: <a href='https://get.adobe.com/cn/flashplayer/'>https://get.adobe.com/cn/flashplayer/</a>" , "未检测到Flash插件");
      }
    }
  }
  // 状态机命名 s_xxx-------------------------------------------------------------
  s_fullscreen_grid: number = 0;
  s_selected_grid: number = 0;
  s_grid_number: number = 4;
  s_popup_show: boolean = false;
  s_popup_allselect: boolean = false;
  // 数据命名 d_xxx-----------------------------------------------------------------
  d_applicationId: number;
  d_analysis_options = [];
  d_analysis_options_detail = [];
  /* http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8 */
  /* rtmp://live.hkstv.hk.lxdns.com/live/hks */
  d_video_list = [];
  /* ngStyle_xx 样式--------------------------------------------------------- */
  ngStyle_popup_allselect () {
    if  (this.s_popup_allselect) {
      return {
        'color': '#23a880'
      }
    }
    return {}
  }
/*  ngStyle_popup_select (selected) {
    if (this.s_popup_allselect) {
      return {
        'color': 'rgba(0,0,0,0.4)'
      }
    }
  }*/
  ngStyle_grid_index3 () {
    let result: any = {};
    let parent_width = $('.right-content').width();
    let parent_height = $('.right-content').height();
    if (this.s_grid_number === 6) {
      let this_height = (parent_height) * 0.331;
      let this_width = (parent_width) * 0.3317;
      result = {
        'width': this_width + 'px',
        'height': this_height + 'px',
        'top': 16 + parent_height * 0.3345 + 'px'
      }
    }
    if (this.s_grid_number === 8) {
      let this_height = (parent_height) * 0.2477;
      let this_width = (parent_width) * 0.2478;
      result = {
        'width': this_width + 'px',
        'height': this_height + 'px',
        'top': 16 + parent_height * 0.251 + 'px'
      }
    }
    if (this.s_selected_grid === 3) {
      result['border'] = '3px solid #23a880';
      result['box-shadow'] = '0px 0px 30px #000';
    }
    return result;
  }
  ngStyle_grid_index4 () {
    let result: any = {};
    let parent_width = $('.right-content').width();
    let parent_height = $('.right-content').height();
    if (this.s_grid_number === 8) {
      let this_height = (parent_height) * 0.2477;
      let this_width = (parent_width) * 0.2478;
      result = {
        'width': this_width + 'px',
        'height': this_height + 'px',
        'top': 16 + parent_height * 0.502 + 'px'
      }
    }
    if (this.s_selected_grid === 4) {
      result['border'] = '3px solid #23a880';
      result['box-shadow'] = '0px 0px 30px #000';
    }
    return result;
  }
  ngStyle_grid_selected (index: number) {
    if (index === this.s_selected_grid) {
      return {
        'border': '3px solid #23a880',
        'box-shadow':　'0px 0px 30px #000'
      }
    }
  }
  ngClass_grid (index: number) {
    return {
      ['grid' + this.s_grid_number]: true,
      'fullscreen': this.s_fullscreen_grid === index
    }
  }
  /*ngStyle_add_video(index: number) {
   let parent = $('.item-add-video').eq(index -1).parents('.player-item');
    let top = (parent.height() - 107) / 2;
    let left = (parent.width() - 107) / 2;
    return {
      'top': top + 'px',
      'left': left + 'px'
    }
  }*/
  // 事件命名规范（$xxx , $http_xxx , $$output）---------------------------------------------
  $grid_icon_click(number: number) {
    if (this.s_grid_number === number) {
      return;
    }
    this.s_popup_show = false;
    this.showFeature = 0;
    this.s_grid_number = number;
    /* 切换视图模式 是否清楚选中项 */
    if (this.s_selected_grid > number) {
      this.s_selected_grid = 0;
      //this.clearSelected();
    }
  }
  $grid_click (index: number , $event) {
   if (index > this.d_video_list.length) {
      return;
   } else if (this.s_selected_grid === index) {
     this.s_selected_grid = 0;
     return;
   }
   /* $event = $event || window.event;
    $event.preventDefault();
    $event.stopPropagation(); */
    this.s_selected_grid = index;
    this.changePopupOptions(this.d_video_list[index - 1].recognitionCategory);

  }
  showFull(index:number){
    this.getIndex(index);
  }
  hideFull(index){
    this.getIndex(index);
  }
  getIndex(index){
    this.fullscreenIndex1 = index;
    this.fullscreenIndex2 = index;
    this.fullscreenIndex3 = index;
    this.fullscreenIndex4 = index;
    this.fullscreenIndex5 = index;
    this.fullscreenIndex6 = index;
    this.fullscreenIndex7 = index;
    this.fullscreenIndex8 = index;
    this.fullscreenIndex9 = index;
  }
  getRecognitionValue(){
    for(let i = 0;i<this.d_analysis_options.length;i++){
      for(let j = 0;j<this.d_analysis_options[i].recognitionCategories.length;j++){
        for(let k=0;k<this.fileRecognition.length;k++){
            if(this.fileRecognition[k].cateId==this.d_analysis_options[i].recognitionCategories[j].cateId){
              this.d_analysis_options[i].recognitionCategories[j].selected = true;
            }
        }
      }
    }
    for(let k=0;k<this.fileRecognition.length;k++){
      if(this.fileRecognition[k].cateId==1&&this.fileRecognition[k].targetInfos.length>0){
        for(let n=0;n<this.fileRecognition[k].targetInfos.length;n++){
          let obj:any={};
          obj.targetFeature=this.fileRecognition[k].targetInfos[n].targetFeature;
          obj.photoContainer=this.fileRecognition[k].targetInfos[n].targetImages.split(',');
          this.arr.push(obj);
        }
      }
    }
    this.arr.splice(0,1);
    console.log(this.arr);
  }
  $popup_toggle () {
    this.s_popup_show = !this.s_popup_show;
   // console.log(this.d_analysis_options);
    //console.log(this.d_video_list);
    //console.log(this.arr);
/*    for(let j=0;j<this.d_video_list.length;j++){
      if(this.d_video_list[j].targets.length>0){
        for(let i=0;i<this.d_video_list[j].targets.length;i++){
            this.saveFeature.push(this.d_video_list[j].targets[i]);
        }
      }
    }
    console.log(this.saveFeature);
    let temp:any[]=[];
    for(let i in this.saveFeature){
      if(temp.indexOf(this.saveFeature[i].targetId)==-1){
        temp.push(this.saveFeature[i]);
      }
    }
    console.log(temp);
    for(let i=0;i<temp.length;i++){
      let obj:any={};
      obj.targetFeature = temp[i].targetFeature;
      obj.photoContainer = temp[i].targetImages.split(",");
      this.arr.push(obj);
      this.arr.splice(0,1);
    }*/

    for(let i=0;i<this.d_analysis_options[0].recognitionCategories.length;i++){
      if(this.d_analysis_options[0].recognitionCategories[i].cateId==1&&this.d_analysis_options[0].recognitionCategories[i].selected){
        this.showFeature = 1;
      }
    }
    if(this.s_popup_show==false){
      this.showFeature = 0;
    }
  }
  getHeight(){
    console.log($(".analysis-popup").height());
    console.log($(".feature-people").height()+103);
    if($(".feature-people").height()+103>$(".analysis-popup").height()){
      $(".feature-people").height($(".analysis-popup").height());
      this.heightIndex = 1;
    }else{
      this.heightIndex = 0;
    }
  }
  validColor(i,j){
    this.d_analysis_options[i].recognitionCategories[j].selected = !this.d_analysis_options[i].recognitionCategories[j].selected;
    for(let k=0;k<this.d_analysis_options[i].recognitionCategories.length;k++){
      if(this.d_analysis_options[i].recognitionCategories[j].cateId!=this.d_analysis_options[i].recognitionCategories[k].cateId){
        this.d_analysis_options[i].recognitionCategories[k].color=1;
      }
    }
  }
  $popup_select_toggle (i,j) {
    if (this.s_popup_allselect) {
      this.s_popup_allselect = !this.s_popup_allselect;
    }
    if(this.d_analysis_options[i].classificationName=='人'){
      if(this.d_analysis_options[i].recognitionCategories[j].color==1){
        return false;
      }
      if(this.d_analysis_options[i].recognitionCategories[j].cateId==1&&this.d_analysis_options[i].recognitionCategories[j].selected){
        this.showFeature = 0;
        this.arr=[{"targetFeature":"","targetImages":"","targetId":0,"targetInfoId":0,"photoContainer":[]}];
        //this.saveSelected = [{"recognitionCategories":{"cateId":0,"code":"","name":""}},];
      }else if(this.d_analysis_options[i].recognitionCategories[j].cateId==1&&!this.d_analysis_options[i].recognitionCategories[j].selected){
        this.showFeature = 1;
      }
      if(!this.d_analysis_options[i].recognitionCategories[j].selected&&this.d_analysis_options[i].recognitionCategories[j].cateId==1){
        this.validColor(i,j);
        this.showFeature = 1;
      }else if(!this.d_analysis_options[i].recognitionCategories[j].selected&&this.d_analysis_options[i].recognitionCategories[j].cateId==26){
        this.validColor(i,j);
      }else if(this.d_analysis_options[i].recognitionCategories[j].selected){
        this.d_analysis_options[i].recognitionCategories[j].selected = !this.d_analysis_options[i].recognitionCategories[j].selected;
        for(let k=0;k<this.d_analysis_options[i].recognitionCategories.length;k++){
          this.d_analysis_options[i].recognitionCategories[k].color=0;
        }
      }
    }else if(this.d_analysis_options[i].classificationName=='对战目标'){
      if(this.d_analysis_options[i].recognitionCategories[j].color1==1){
        return false;
      }
      if(!this.d_analysis_options[i].recognitionCategories[j].selected&&this.d_analysis_options[i].recognitionCategories[j].cateId==30){
        this.d_analysis_options[i].recognitionCategories[j].selected = !this.d_analysis_options[i].recognitionCategories[j].selected;
        for(let k=0;k<this.d_analysis_options[i].recognitionCategories.length;k++){
          if(this.d_analysis_options[i].recognitionCategories[k].cateId!=30){
            this.d_analysis_options[i].recognitionCategories[k].color1=1;
          }
        }
      }else if(!this.d_analysis_options[i].recognitionCategories[j].selected&&this.d_analysis_options[i].recognitionCategories[j].cateId!=30){
        this.d_analysis_options[i].recognitionCategories[j].selected = !this.d_analysis_options[i].recognitionCategories[j].selected;
        for(let k=0;k<this.d_analysis_options[i].recognitionCategories.length;k++){
          if(this.d_analysis_options[i].recognitionCategories[k].cateId==30){
            this.d_analysis_options[i].recognitionCategories[k].color1=1;
          }
        }
      }else if(this.d_analysis_options[i].recognitionCategories[j].selected){
        this.d_analysis_options[i].recognitionCategories[j].selected = !this.d_analysis_options[i].recognitionCategories[j].selected;
        for(let k=0;k<this.d_analysis_options[i].recognitionCategories.length;k++){
          this.d_analysis_options[i].recognitionCategories[k].color1=0;
        }
      }
    }else{
      this.d_analysis_options[i].recognitionCategories[j].selected = !this.d_analysis_options[i].recognitionCategories[j].selected;
    }
  }
  arrow_toggle(index: number){
    if(this.d_analysis_options[index].selected){
      this.d_analysis_options[index].selected = !this.d_analysis_options[index].selected;
    }else{
      for(let i=0;i<this.d_analysis_options.length;i++){
        this.d_analysis_options[i].selected=false;
      }
      this.d_analysis_options[index].selected = !this.d_analysis_options[index].selected;
    }
  }
  $popup_select_all_toggle () {
    this.s_popup_allselect = !this.s_popup_allselect;
    if(this.s_popup_allselect){
      for(let i=0;i<this.d_analysis_options.length;i++){
        for(let j=0;j<this.d_analysis_options[i].recognitionCategories.length;j++)
        this.d_analysis_options[i].recognitionCategories[j].selected = true;
      }
      //console.log(this.d_analysis_options);
    }else{
      for(let i=0;i<this.d_analysis_options.length;i++){
        for(let j=0;j<this.d_analysis_options[i].recognitionCategories.length;j++)
          this.d_analysis_options[i].recognitionCategories[j].selected = !this.d_analysis_options[i].recognitionCategories[j].selected;
      }
      //console.log(this.d_analysis_options);
    }
  }

  $fullscreen_click (index: number , $event) {
    $event = $event || window.event;
    $event.preventDefault();
    $event.stopPropagation();
    if (this.s_fullscreen_grid > 0) {
      this.s_fullscreen_grid = 0;
    } else {
      if (this.d_video_list.length < index) {
        return;
      }
      this.s_popup_show = false;
      this.s_fullscreen_grid = index;
      this.s_selected_grid = index;
    }
  }
  $add_video_click(index: number , $event) {
    $event = $event || window.event;
    $event.preventDefault();
    $event.stopPropagation();
    this.addDialog = 1;
    this.protocol = this.protocols[0];
    this.channelType = this.channelTypes[0];
    this.chanName = '';
    this.chanAddr = '';
    this.videoAddress = '';
    this.radioIndex = 1;
  }
  ngIfaddVideo(index: number) {
    if (this.d_video_list.length >= index) {
      return false;
    }
    return true;
  }
  getFeature(arr){
    this.arr = arr;
    this.saveSelected=[];
    this.targetSet=[];
    for (let i = 0 ; i < this.d_analysis_options.length ; i++) {
      for (let j = 0 ; j < this.d_analysis_options[i].recognitionCategories.length ; j++) {
        if (this.d_analysis_options[i].recognitionCategories[j].selected || this.s_popup_allselect) {
          this.saveSelected.push(this.d_analysis_options[i].recognitionCategories[j]);
        }
      }
    }
    for(let i=0;i<arr.length;i++){
      let obj:any={};
      obj.targetImages=arr[i].photoContainer.join(",");
      obj.targetFeature = arr[i].targetFeature;
      obj.targetInfoId = 0;
      this.targetSet.push(obj);
    }
    for(let i=0;i<this.saveSelected.length;i++){
      if(this.saveSelected[i].cateId!=1){
        this.saveSelected[i].targetInfos=[];
      }else{
        this.saveSelected[i].targetInfos=[];
        for(let j=0;j<this.targetSet.length;j++){
          this.saveSelected[i].targetInfos.push(this.targetSet[j]);
        }
      }
    }
    let tempArr:any[]=[];
    for(let j=0;j<this.saveSelected.length;j++){
      let obj:any={};
      obj.cateId = this.saveSelected[j].cateId;
      obj.targetId = 0;
      obj.recognitionCategory = this.saveSelected[j].code;
      obj.targetInfos = this.saveSelected[j].targetInfos;
      tempArr.push(obj);
    }
    return tempArr;
  }
  $change_analysis_submit() {
    if(this.saveColor == 0){
      return false;
    }else{
      addWaitToast(this.toastyService ,'等待视频源重新加载','保存成功');
      // todo request
      this.showFeature = 0;
      this.s_popup_show = false;
      //console.log(this.getFeature(this.arr));
      if (this.s_selected_grid === 0) {
        // 当前所有
        this.recognitionService.setRecognitions( this.getAllChannelID() , this.getSelectedRecognitions(),this.getFeature(this.arr)).subscribe(rep => {
          console.log(rep);
          this.d_video_list= rep.sort(function(a,b){
            return parseInt(a.channelOrder) - parseInt(b.channelOrder)
          });
        });
      } else {
        //
        this.recognitionService.setRecognitions( this.d_video_list[this.s_selected_grid -1].channelId , this.getSelectedRecognitions(),this.getFeature(this.arr)).subscribe(rep => {
          console.log(rep);
          this.d_video_list[this.s_selected_grid -1].recognitionCategory = rep[0].recognitionCategory;
        });
      }
      //this.s_popup_show = false;
    }
  }
  /* 获得当前为true的 recognition */
  getSelectedRecognitions() {
    let recognitions = '';
    for (let i = 0 ; i < this.d_analysis_options.length ; i++) {
      for (let j = 0 ; j < this.d_analysis_options[i].recognitionCategories.length ; j++) {
        if (this.d_analysis_options[i].recognitionCategories[j].selected || this.s_popup_allselect) {
          recognitions += this.d_analysis_options[i].recognitionCategories[j].code + ',';
        }
      }
    }
    console.log(recognitions.substring( 0 ,recognitions.length -1));
    return recognitions.substring( 0 ,recognitions.length -1);
  }

  getAllChannelID() {
    let channelIDS = '';
    let arr:any=[];
    for(let i=0;i<this.d_video_list.length;i++){
      if(this.d_video_list[i].channelStatus=='1'){
          arr.push(this.d_video_list[i]);
      }
    }
    console.log(arr);
    for (let i = 0 ; i < arr.length ; i++) {
      channelIDS += arr[i].channelId + ',';
    }
    return channelIDS.substring( 0 ,channelIDS.length -1);
  }
  //------
  get_ckplayer_url (index: number) {
    if (this.d_video_list && this.d_video_list.length >= index) {
      return this.d_video_list[index-1].channelOut
    }
    return null;
  }

  get_ckplayer_type (index: number) {
    if (this.d_video_list && this.d_video_list.length >= index) {
      return this.d_video_list[index-1].type
    }
    return null;
  }

  get_ckplayer_exist (index: number) {
    if (this.d_video_list && this.d_video_list.length >= index) {
      return true
    }
    return false;
  }
  get_ckplayer_index (index: number) {
    if (this.d_video_list && this.d_video_list.length >= index) {
      return this.d_video_list[index-1].channelName;
    }
    return null;
  }
  $channel_click(index:number, $event){
    $event = $event || window.event;
    $event.preventDefault();
    $event.stopPropagation();
    if (this.d_video_list && this.d_video_list.length >= index) {
      //console.log(this.d_video_list);
      if(this.d_video_list[index-1].channelStatus==1){
        this.channelService.run(this.d_video_list[index-1].channelId,0)
          .subscribe(reply => {
            this.initChannelsNoSort();
          });
      }else  if(this.d_video_list[index-1].channelStatus==0){
        this.channelService.run(this.d_video_list[index-1].channelId,1)
          .subscribe(reply => {
            this.initChannelsNoSort();
          });
      }
    }
  }
  get_switch(index){
    if (this.d_video_list && this.d_video_list.length >= index) {
      if(this.d_video_list[index-1].channelStatus=='0'){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }
  get_switch_icon_url (index: number) {
    let size_22 = 'assets/appdetail/video-analysis/zanting.png';
    let size_20 = 'assets/appdetail/video-analysis/zanting-22.png';
    let size_18 = 'assets/appdetail/video-analysis/zanting-20.png';
    if (this.s_fullscreen_grid === index) {
      return 'assets/appdetail/video-analysis/zanting.png'
    }
    switch (this.s_grid_number) {
      case 1: {
        return size_22;
      }
      case 4: {
        return size_20;
      }
      case 6: {
        if (index === 1) {
          return size_22;
        }
        return size_20;
      }
      case 8: {
        if (index === 1) {
          return size_22;
        }
        return size_18;
      }
      case 9: {
        return size_18;
      }
    }
  }
  get_switch_off_icon_url (index: number) {
    let size_22 = 'assets/appdetail/video-analysis/kaishi.png';
    let size_20 = 'assets/appdetail/video-analysis/kaishi-22.png';
    let size_18 = 'assets/appdetail/video-analysis/kaishi-20.png';
    if (this.s_fullscreen_grid === index) {
      return 'assets/appdetail/video-analysis/kaishi.png'
    }
    switch (this.s_grid_number) {
      case 1: {
        return size_22;
      }
      case 4: {
        return size_20;
      }
      case 6: {
        if (index === 1) {
          return size_22;
        }
        return size_20;
      }
      case 8: {
        if (index === 1) {
          return size_22;
        }
        return size_18;
      }
      case 9: {
        return size_18;
      }
    }
  }
  get_fullscreen_icon_url (index: number) {
    let size_22 = 'assets/appdetail/video-analysis/icon_fullscreen_22.png';
    let size_20 = 'assets/appdetail/video-analysis/icon_fullscreen_20.png';
    let size_18 = 'assets/appdetail/video-analysis/icon_fullscreen_18.png';
    if (this.s_fullscreen_grid === index) {
      return 'assets/appdetail/video-analysis/icon_fullscreen_close.png'
    }
    switch (this.s_grid_number) {
      case 1: {
        return size_22;
      }
      case 4: {
        return size_20;
      }
      case 6: {
        if (index === 1) {
          return size_22;
        }
        return size_20;
      }
      case 8: {
        if (index === 1) {
          return size_22;
        }
        return size_18;
      }
      case 9: {
        return size_18;
      }
    }
  }
  changePopupOptions(str) {
    //this.clearSelected();
    if (str) {
      let recognitions = str.split(',');
      for (let i = 0 ; i < recognitions.length ; i ++) {
        for (let j = 0 ; j < this.d_analysis_options.length ; j++) {
          if (this.d_analysis_options[j].code == recognitions[i]) {
            this.d_analysis_options[j].selected = true;
          }
        }
      }
    }
  }

  clearSelected() {
    this.s_popup_allselect = false;
    for (let i = 0 ; i < this.d_analysis_options.length ; i++) {
      this.d_analysis_options[i].selected = false;
    }
  }

  initRecognitions() {
    this.recognitionService.getRecognition().subscribe(rep => {
      //console.log(rep);
      this.d_analysis_options = rep;
      this.getRecognitionValue();
      for(let i=0;i<this.d_analysis_options.length;i++){
        this.d_analysis_options[i].recognitionCategories.sort(function(a,b){
          return parseInt(b.cateId) - parseInt(a.cateId)
        })
      }
      this.d_analysis_options[0].selected=true;
      //this.d_analysis_options_detail= rep ;
    })
  }
  initChannelsNoSort(){
    this.channelService.getOpenChannelById(this.d_applicationId).subscribe(rep => {
      this.d_video_list = rep;
      console.log(rep);
      this.d_video_list.sort(function(a,b){
        return parseInt(a.channelOrder) - parseInt(b.channelOrder)
      });
      this.getChannelId();
      //this.init_grid_number(rep.length ? rep.length : 0);
    });
  }
  initChannels() {
    var test = {
      // channelOut: 'rtmp://www.ossrs.net:1935/live/demo.1496733858737.1499159873989',
      // channelOut: 'rtmp://live.hkstv.hk.lxdns.com/live/hks', // 香港卫视
      // channelOut: 'rtmp://62.113.210.250:1935/medienasa-live/ok-magdeburg_high', // 德国
      // channelOut: 'rtmp://146.185.30.242:1935/live/safeer1', // 英国
      // channelOut: 'rtmp://s2.live14.com:1935/stream/5195e80fe1ed0' //泰国
      // channelOut: 'http://v.cctv.com/flash/mp4video6/TMS/2011/01/05/cf752b1c12ce452b3040cab2f90bc265_h264818000nero_aac32-1.mp4'
    }
    this.channelService.getOpenChannelById(this.d_applicationId).subscribe(rep => {
      this.d_video_list = rep;
      console.log(rep);
      this.d_video_list.sort(function(a,b){
        return parseInt(a.channelOrder) - parseInt(b.channelOrder)
      })
      this.init_grid_number(rep.length ? rep.length : 0);
      this.getChannelId();
    });
  }
  getChannelId(){
    for(let i=0;i<this.d_video_list.length;i++){
      if(this.d_video_list[i].channelStatus=='1'){
        this.saveColor = 1;
        break;
      }else{
        this.saveColor = 0;
      }
    }
  }
  init_grid_number(number) {
    if (number <= 1) {
      this.s_grid_number = 1
    } else if (number <= 4) {
      this.s_grid_number = 4
    } else if (number <= 6) {
      this.s_grid_number = 6
    } else if (number <= 8) {
      this.s_grid_number = 8
    } else {
      this.s_grid_number = 9
    }
  }


  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });
  selectedFileOnChanged(event,item){
    console.log(item);
    for(let i=0;i<this.uploader.queue.length;i++){
      this.uploader.queue[i].onSuccess = (response: any, status: any, headers: any) => {
        item.photoContainer.push(response);
        console.log(item.photoContainer);
      };
    }
    this.uploader.uploadAll(); // 开始上传
  }
  getInput(i){
    console.log(i);
    //document.getElementById("file").setAttribute("id",i).click();
    $(`#${i}`).attr("id",i).click();
  }
  outputImg(item){
    return item.slice(25);
  }
  delPhoto(item,index){
    item.photoContainer.splice(index,1);
  }
  addData(){
    let obj:any={};
    obj.targetFeature = '';
    obj.targetImages = '';
    obj.photoContainer=[];
    this.arr.push(obj);
    console.log(this.arr);
    this.getHeight();
  }
}
