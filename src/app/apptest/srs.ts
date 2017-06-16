/**
 * Created by zhy on 2017/6/16.
 */
import {get_srs_upload_url, get_srs_remote_url} from '../../assets/srsvideo/core/srs.config'
import {srs_can_republish} from '../../assets/srsvideo/core/srs.page'
import {SrsPublisher} from '../../assets/srsvideo/core/srs.publisher'
import {SrsPlayer} from '../../assets/srsvideo/core/srs.player'
import {parse_query_string} from '../../assets/srsvideo/core/winlin.utility'
declare var $: any;

const VIDEO_WIDTH: number = 500;
const VIDEO_HEIGHT: number = 300;

var srs_publisher = null;
var remote_player = null;
var realtime_player = null;
var query = parse_query_string();
export const srs_init = () => {
  console.log('srs_publisher init')
  srs_publisher = new SrsPublisher('local_publisher' , VIDEO_WIDTH , VIDEO_HEIGHT , null);
  // 开启本地直播
  srs_publisher.start();
  if (query.no_play != "true") {
    console.log('play init')
    // start the normal player with HLS supported.
    remote_player = new SrsPlayer("remote_player", VIDEO_WIDTH, VIDEO_HEIGHT , null);
    remote_player.buffer_time = 0.8;
    remote_player.start();

    // start the realtime player.
    realtime_player = new SrsPlayer("realtime_player", VIDEO_WIDTH, VIDEO_HEIGHT , null);
    realtime_player.buffer_time = 0.8;
    realtime_player.start();
  }
   open_publish_click();
}

/**
 * @click 点击发布
 */
export const open_publish_click = () => {
  let device = JSON.parse(window.localStorage[srs_publisher.id]);
  if (device) {
    window.localStorage[srs_publisher.id] = null;
  }
  // todo 初始化参数
  var vcodec: any = {};
  var acodec: any = {};
  acodec.device_code = 0;
  acodec.device_name = device.microphones[0];
  vcodec.device_code = 0;
  vcodec.device_name = device.cameras[0];
  acodec.codec= 'h264';
  vcodec.codec    = 'h264';
  vcodec.profile  = 'main';
  vcodec.level    = '4.1';
  vcodec.fps      = '20';
  vcodec.gop      = '10';
  vcodec.size     = '640x480';
  vcodec.bitrate  = '500';
  var publisher_url = get_srs_upload_url();
  srs_publisher.publish(publisher_url, vcodec, acodec);
  if (realtime_player) {
    // directly play the url for the realtime player.
    realtime_player.stop();
    realtime_player.play(publisher_url);
  }

  if (remote_player) {
    // the normal player should play the transcoded stream in another vhost.
    // for example, publish stream to vhost players,
    // the realtime player play the vhost players, which may donot support HLS,
    // the normal player play the vhost players_pub, which transcoded to h264/aac with HLS.
    remote_player.stop();
    remote_player.play(get_srs_remote_url());
  }

}

/**
 * @click 关闭发布
 */
export const close_publish_click = () => {
  srs_publisher.stop();
}
export const on_publish_stop = () => {
  if (!srs_can_republish()) {
    $("#btn_join").attr("disabled", true);
    // todo dialog error
    // 您使用的浏览器很弱，请关闭页面后重新打开页面（刷新也不管用）。<br/>推荐使用Chrome/Firefox/Safari/Opera浏览器，支持重试
    return false;
  }
  return true;
}
