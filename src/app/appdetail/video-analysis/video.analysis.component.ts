/**
 * Created by Administrator on 2017/6/20 0020.
 */
import { Component } from '@angular/core';
import {ChannelService} from "../../common/services/channel.service";
import {RecognitionService} from "../../common/services/recognition.service";
import {ToastyService} from 'ng2-toasty';
import {addWarningToast} from '../../common/ts/toast';
declare var $:any;
@Component({
  selector: 'video-analysis',
  styleUrls: ['./css/video.analysis.component.css'],
  templateUrl: './template/video.analysis.component.html',
  providers: [ChannelService , RecognitionService]
})
export class VideoAnalysisComoponent {
  ngOnInit() {
    console.log(window.navigator.plugins)
  }
  constructor (private channelService: ChannelService , private recognitionService: RecognitionService, private toastyService:ToastyService) {
    this.d_applicationId = parseInt(window.sessionStorage.getItem('applicationId'));
     /* 初始化recognition */
    this.initRecognitions();
    /* 初始化channel */
    this.initChannels();
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
  /* http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8 */
  /* rtmp://live.hkstv.hk.lxdns.com/live/hks */
  d_video_list = [];
  /* ngStyle_xx 样式--------------------------------------------------------- */
  ngStyle_popup_allselect () {
    if  (this.s_popup_allselect) {
      return {
        'color': '#23c880'
      }
    }
    return {}
  }
  ngStyle_popup_select (selected) {
    if (this.s_popup_allselect) {
      return {
        'color': 'rgba(0,0,0,0.4)'
      }
    }
  }
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
        'top': 26 + parent_height * 0.3345 + 'px'
      }
    }
    if (this.s_grid_number === 8) {
      let this_height = (parent_height) * 0.2477;
      let this_width = (parent_width) * 0.2478;
      result = {
        'width': this_width + 'px',
        'height': this_height + 'px',
        'top': 26 + parent_height * 0.251 + 'px'
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
        'top': 26 + parent_height * 0.502 + 'px'
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
  // 事件命名规范（$xxx , $http_xxx , $$output）---------------------------------------------
  $grid_icon_click(number: number) {
    if (this.s_grid_number === number) {
      return;
    }
    this.s_grid_number = number;
    /* 切换视图模式 是否清楚选中项 */
    if (this.s_selected_grid > number) {
      this.s_selected_grid = 0;
      this.clearSelected();
    }
  }
  $grid_click (index: number , $event) {
   if (this.s_selected_grid === index || index > this.d_video_list.length) {
      return;
    }
    console.log($event)
   /* $event = $event || window.event;
    $event.preventDefault();
    $event.stopPropagation(); */
    this.s_selected_grid = index;
    this.changePopupOptions(this.d_video_list[index - 1].recognitionCategory);

  }
  $popup_toggle () {
    this.s_popup_show = !this.s_popup_show;
  }
  $popup_select_toggle (index: number) {
    if (this.s_popup_allselect) {
      return;
    }
    // todo 修改order
    this.d_analysis_options[index].selected = !this.d_analysis_options[index].selected;
  }
  $popup_select_all_toggle () {
    this.s_popup_allselect = !this.s_popup_allselect;
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
      this.s_fullscreen_grid = index;
      this.s_selected_grid = index;
    }
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
      return this.d_video_list[index-1].channelOrder
    }
    return null;
  }

  get_fullscreen_url (index: number) {
    let size_22 = 'assets/appdetail/video-analysis/icon_fullscreen_22.png';
    let size_20 = 'assets/appdetail/video-analysis/icon_fullscreen_20.png'
    let size_18 = 'assets/appdetail/video-analysis/icon_fullscreen_18.png'
    if (this.s_fullscreen_grid === index) {
      console.log('close fullscreen icon')
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
    this.clearSelected();
    if (str) {
      let recognitions = str.split(',');
      for (let i = 0 ; i < recognitions.length ; i ++) {
        for (let j = 0 ; j < this.d_analysis_options.length ; j++) {
          if (this.d_analysis_options[j].cateId == recognitions[i]) {
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
    this.recognitionService.getRecognitions().subscribe(rep => {
      console.log(rep)
      this.d_analysis_options = rep;
    })
  }
  initChannels() {
    this.channelService.getOpenChannelById(this.d_applicationId).subscribe(rep => {
      this.d_video_list = rep;
      this.d_video_list.sort(function(a,b){
        return parseInt(a.channelOrder) - parseInt(b.channelOrder)
      })
      this.init_grid_number(rep.length ? rep.length : 0);
     /* var test = {
        channelOut: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
        recognitionCategory: '148,153,150,151'
      }
      this.d_video_list.push(test) */
      /* this.d_video_list.push(test)
      this.d_video_list.push(test)
      this.d_video_list.push(test)*/
      console.log(this.d_video_list)
    });
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
}
