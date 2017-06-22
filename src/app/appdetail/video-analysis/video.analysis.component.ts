/**
 * Created by Administrator on 2017/6/20 0020.
 */
import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'video-analysis',
  styleUrls: ['./css/video.analysis.component.css'],
  templateUrl: './template/video.analysis.component.html'
})
export class VideoAnalysisComoponent {
  // 状态机命名 s_xxx-------------------------------------------------------------
  s_fullscreen_grid: number = 0;
  s_selected_grid: number = 0;
  s_grid_number: number = 4;
  s_popup_show: boolean = false;
  s_popup_allselect: boolean = false;
  // 数据命名 d_xxx-----------------------------------------------------------------
  d_analysis_options = [{
    des: '人物',
    selected: false
  } , {
    des: '信号灯',
    selected: true
  } , {
    des: '猫',
    selected: true
  }, {
    des: '树',
    selected: false
  }, {
    des: '车辆',
    selected: true
  }, {
    des: '文字',
    selected: false
  }];
  /* http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8 */
  d_video_list = [{
    url: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
    type: 'rtmp'
  },{
    url: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
    type: 'rtmp'
  }];
  /* 生命周期 */
  ngAfterViewInit() {
  }
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
    if (!selected || this.s_popup_allselect) {
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
    }
    return result;
  }
  ngStyle_grid_selected (index: number) {
    if (index === this.s_selected_grid) {
      return {
        'border': '3px solid #23a880'
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
    }
  }
  $grid_click (index: number , $event) {
    $event = $event || window.event;
    $event.preventDefault();
    $event.stopPropagation();
    this.s_selected_grid = index;
  }
  $popup_toggle () {
    this.s_popup_show = !this.s_popup_show;
  }
  $popup_select_toggle (index: number) {
    if (this.s_popup_allselect) {
      return;
    }
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
      this.s_fullscreen_grid = index;
      this.s_selected_grid = index;
    }
  }
  //------
  get_ckplayer_url (index: number) {
    if (this.d_video_list && this.d_video_list.length >= index) {
      return this.d_video_list[index-1].url
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

}
