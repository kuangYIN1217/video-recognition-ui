/**
 * Created by zhy on 2017/6/16.
 */
import {get_srs_version} from './srs.config'
declare var swfobject: any;
declare var $: any;
var __srs_find_publisher = function (id) {
  console.log('find publisher')
  for (var i = 0; i < SrsPublisher.__publishers.length; i++) {
    var publisher = SrsPublisher.__publishers[i];

    if (publisher.id != id) {
      continue;
    }

    return publisher;
  }

  throw new Error("publisher not found. id=" + id);
}
export class SrsPublisher {
  static __id: number = 100;
  static __publishers = [];
  id = SrsPublisher.__id++;
  callbackObj: any = null;
  url = null;
  vcodec = {};
  acodec = {};
  cameras = [];
  microphones = [];
  code = 0;

  // error code defines.
  errors = {
    "100": "无法获取指定的摄像头。", //error_camera_get
    "101": "无法获取指定的麦克风。", //error_microphone_get
    "102": "摄像头为禁用状态，推流时请允许flash访问摄像头。", //error_camera_muted
    "103": "服务器关闭了连接。", //error_connection_closed
    "104": "服务器连接失败。", //error_connection_failed
    "199": "未知错误。"
  };
  container;
  width;
  height;
  private_object;

  constructor(container, width, height, private_object) {
    SrsPublisher.__publishers.push(this);
    this.container = container;
    this.width = width;
    this.height = height;
    this.private_object = private_object;
  }

  start() {
    console.log('start')
    // embed the flash.
    var flashvars: any = {};
    flashvars.id = this.id;
    flashvars.width = this.width;
    flashvars.height = this.height;
    flashvars.on_publisher_ready = this.__srs_on_publisher_ready;
    flashvars.on_publisher_error = this.__srs_on_publisher_error;
    flashvars.on_publisher_warn = this.__srs_on_publisher_warn;

    var params: any = {};
    params.wmode = "opaque";
    params.allowFullScreen = "true";
    params.allowScriptAccess = "always";

    var attributes = {};

    var self = this;
    swfobject.embedSWF(
      "/assets/srsvideo/swf/srs_publisher.swf?_version=" + get_srs_version(),
      this.container,
      this.width, this.height,
      "11.1.0", "js/AdobeFlashPlayerInstall.swf",
      flashvars, params, attributes,
      function (callbackObj) {
        self.callbackObj = callbackObj;
      }
    );
    return this;
  }

  publish(url, vcodec, acodec) {
    this.stop();
    SrsPublisher.__publishers.push(this);

    if (url) {
      this.url = url;
    }
    if (vcodec) {
      this.vcodec = vcodec;
    }
    if (acodec) {
      this.acodec = acodec;
    }

    this.callbackObj.ref.__publish(this.url, this.width, this.height, this.vcodec, this.acodec);
  }

  stop() {
    for (var i = 0; i < SrsPublisher.__publishers.length; i++) {
      var player = SrsPublisher.__publishers[i];

      if (player.id != this.id) {
        continue;
      }

      SrsPublisher.__publishers.splice(i, 1);
      break;
    }

    this.callbackObj.ref.__stop();
  }

  __srs_on_publisher_ready(id, cameras, microphones) {
    window.localStorage[id] = JSON.stringify({cameras: cameras, microphones: microphones});
  }

  __srs_on_publisher_error(id, code) {
    var publisher = __srs_find_publisher(id);

    publisher.code = code;

    publisher.on_publisher_error(code, publisher.errors["" + code]);
  }

  __srs_on_publisher_warn(id, code) {
    var publisher = __srs_find_publisher(id);

    publisher.code = code;

    publisher.on_publisher_warn(code, publisher.errors["" + code]);
  }

}
