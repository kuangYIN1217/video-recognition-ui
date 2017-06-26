/**
 * Created by Administrator on 2017/6/22 0022.
 */
import {Component, Input} from '@angular/core'
declare var jwplayer: any;
@Component({
  selector: 'jwplayer',
  templateUrl: './template/jwplayer.component.html',
  styleUrls: ['./css/jwplayer.component.css']
})
export class JWplayerComponent {
  @Input() url: string ;
  @Input() ckID: string = this.uuid(8 , 16); // 产生随机uuid
  ngAfterViewInit() {
    console.log(this.url)
    var playerInstance = jwplayer(this.ckID);
    //初始化视频
    playerInstance.setup({
      file: this.url,
      playlist: [
        {
          sources: [
            {
              file: this.url
            }
          ]
        }
      ],
      autostart: true,
      controls: false
    });
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
