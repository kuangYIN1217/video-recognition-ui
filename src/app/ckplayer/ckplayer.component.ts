/**
 * Created by Administrator on 2017/6/20 0020.
 */
import {Component, Input} from '@angular/core'
declare var CKobject: any;
@Component({
  selector: 'ckplayer',
  templateUrl: './template/ckplayer.component.html',
  styleUrls: ['./css/ckplayer.component.css']
})
export class CkplayerComponent {
  @Input() mediaType: string = 'rtmp';
  @Input() url: string ;
  @Input() hlsSwfPath: string = 'assets/ckplayer6.8/m3u8.swf';
  @Input() ckSwfPath: string = 'assets/ckplayer6.8/ckplayer.swf';
  @Input() ckID: string = this.uuid(8 , 16); // 产生随机uuid
  @Input() width: string = '100%';
  @Input() height: string = '110%';

  params = {bgcolor: '#FFF', allowFullScreen: true, allowScriptAccess: 'always', wmode: 'transparent'};
  /* 播放窗口占比设置 */
  ckstyles() {
    return {
      'width': this.width,
      'height': this.height
    };
  }

  ngAfterViewInit() {
    if (this.mediaType === 'rtmp') {
      this.initRtmp();
    } else {
      this.initHLS();
    }
  }

  /* 初始化rtmp视频流 */
  initRtmp() {
    var flashvars_rtmp;
    flashvars_rtmp={
      f: this.url,
      p: 1,
      s: 0,
      lv: 1,
      v: 0
    };
    CKobject.embedSWF(this.ckSwfPath , this.ckID, "video", "100%", "100%", flashvars_rtmp, this.params);
  }

  /* 初始化hls视频流 */
  initHLS() {
    var flashvars;
    flashvars={
      f: this.hlsSwfPath,
      a: this.url,
      p: 1, // 默认播放
      s: 4, // 视频格式
      lv: 1,
      v: 0 // 默认音量
    };
    CKobject.embedSWF(this.ckSwfPath,  this.ckID, "video", "100%", '100%', flashvars,  this.params);
  }

  /* 屏蔽右击事件 */
  nocontextmenu($event) {
    $event = $event || window.event;
    if ($event.cancelBubble) {
      event.cancelBubble = true;
    } else if ($event.returnvalue) {
      $event.returnvalue = false;
    }
    return false;
  }
  onmousedown ($event) {
    $event = $event || window.event;
    if ($event.button == 2){
      if ($event.cancelBubble) {
        event.cancelBubble = true;
      } else if ($event.returnvalue) {
        $event.returnvalue = false;
      }
    }
  }

  /* 生成uuid */
  uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }

}
