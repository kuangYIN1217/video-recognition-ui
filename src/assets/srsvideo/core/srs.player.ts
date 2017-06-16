/**
 * Created by zhy on 2017/6/16.
 */
import {get_srs_version} from './srs.config'
declare var swfobject: any;
export class SrsPlayer {
  static __id = 100;
  id = SrsPlayer.__id++;
  static __players = [];
  container;
  width;
  height;
  private_object;

  constructor(container, width, height, private_object) {
    SrsPlayer.__players.push(this);
    this.container = container;
    this.width = width;
    this.height = height;
    this.private_object = private_object;
  }

  stream_url = null;
  buffer_time = 0.3; // default to 0.3
  max_buffer_time = this.buffer_time * 3; // default to 3 x bufferTime.
  volume = 1.0; // default to 100%
  callbackObj: any = null;
  srs_player_url = "/assets/srsvideo/swf/srs_player.swf?_version=" + get_srs_version();

  // callback set the following values.
  meatadata = {}; // for on_player_metadata
  time = 0; // current stream time.
  buffer_length = 0; // current stream buffer length.
  kbps = 0; // current stream bitrate(video+audio) in kbps.
  fps = 0; // current stream video fps.
  rtime = 0; // flash relative time in ms.
  __fluency: any = {
    total_empty_count: 0,
    total_empty_time: 0,
    current_empty_time: 0,
    on_stream_empty: function (time) {
      this.total_empty_count++;
      this.current_empty_time = time;
    },
    on_stream_full: function (time) {
      if (this.current_empty_time > 0) {
        this.total_empty_time += time - this.current_empty_time;
        this.current_empty_time = 0;
      }
    },
    calc: function (time) {
      var den = this.total_empty_count * 4 + this.total_empty_time * 2 + time;
      if (den > 0) {
        return time * 100 / den;
      }
      return 0;
    }
  };

  start(url) {
    console.log('play start')
    if (url) {
      this.stream_url = url;
    }

    // embed the flash.
    var flashvars: any = {};
    flashvars.id = this.id;
    flashvars.on_player_ready = this.__srs_on_player_ready;
    flashvars.on_player_metadata = this.__srs_on_player_metadata;
    flashvars.on_player_timer = this.__srs_on_player_timer;
    flashvars.on_player_empty = this.__srs_on_player_empty;
    flashvars.on_player_full = this.__srs_on_player_full;
    flashvars.on_player_status = this.__srs_on_player_status;

    var params: any = {};
    params.wmode = "opaque";
    params.allowFullScreen = "true";
    params.allowScriptAccess = "always";

    var attributes: any = {};

    var self = this;
    swfobject.embedSWF(
      this.srs_player_url,
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

  play(url, volume) {
    this.stop();
    SrsPlayer.__players.push(this);

    if (url) {
      this.stream_url = url;
    }

    // volume maybe 0, so never use if(volume) to check its value.
    if (volume != null && volume != undefined) {
      this.volume = volume;
    }

    this.callbackObj.ref.__play(this.stream_url, this.width, this.height, this.buffer_time, this.max_buffer_time, this.volume);
  }

  stop() {
    console.log( this.callbackObj)
    this.callbackObj.ref.__stop();
  }

  pause() {
    this.callbackObj.ref.__pause();
  }

  resume() {
    this.callbackObj.ref.__resume();
  }

  fluency() {
    return this.__fluency.calc(this.rtime);
  }

  empty_count() {
    return this.__fluency.total_empty_count;
  }

  dump_log() {
    return this.callbackObj.ref.__dump_log();
  }

  set_dar(num, den) {
    this.callbackObj.ref.__set_dar(num, den);
  }

  set_fs(refer, percent) {
    this.callbackObj.ref.__set_fs(refer, percent);
  }

  set_bt(buffer_time) {
    if (this.buffer_time == buffer_time) {
      return;
    }

    this.buffer_time = buffer_time;
    this.callbackObj.ref.__set_bt(buffer_time);

    // reset the max buffer time to 3 x buffer_time.
    this.set_mbt(buffer_time * 3);
  }

  /**
   * set the stream max buffer time in seconds.
   * @param max_buffer_time the max buffer time in seconds.
   * @remark this is the key feature for realtime communication by flash.
   */
  set_mbt(max_buffer_time) {
    // we must atleast set the max buffer time to 0.6s.
    max_buffer_time = Math.max(0.6, max_buffer_time);
    // max buffer time always greater than buffer time.
    max_buffer_time = Math.max(this.buffer_time, max_buffer_time);

    if ((this.max_buffer_time * 10) == (max_buffer_time * 10)) {
      return;
    }

    this.max_buffer_time = max_buffer_time;
    this.callbackObj.ref.__set_mbt(max_buffer_time);
  }

  /**
   * set the srs_player.swf url
   * @param url, srs_player.swf's url.
   * @param params, object.
   */
  set_srs_player_url(url, params) {
    var query_array = [],
      query_string = "",
      p;
    params = params || {};
    params._version = get_srs_version();
    for (p in params) {
      if (params.hasOwnProperty(p)) {
        query_array.push(p + "=" + encodeURIComponent(params[p]));
      }
    }
    query_string = query_array.join("&");
    this.srs_player_url = url + "?" + query_string;
  }
  /**
   * helpers.
   */
  __srs_find_player(id) {
    for (var i = 0; i < SrsPlayer.__players.length; i++) {
      var player = SrsPlayer.__players[i];

      if (player.id != id) {
        continue;
      }

      return player;
    }

    throw new Error("player not found. id=" + id);
  }

  __srs_on_player_ready(id) {
    var player = this.__srs_find_player(id);
    player.on_player_ready();
  }

  __srs_on_player_metadata(id, metadata) {
    var player = this.__srs_find_player(id);

    // user may override the on_player_metadata,
    // so set the data before invoke it.
    player.metadata = metadata;

    player.on_player_metadata(metadata);
  }

  __srs_on_player_timer(id, time, buffer_length, kbps, fps, rtime) {
    var player = this.__srs_find_player(id);

    buffer_length = Math.max(0, buffer_length);
    buffer_length = Math.min(player.buffer_time, buffer_length);

    time = Math.max(0, time);

    // user may override the on_player_timer,
    // so set the data before invoke it.
    player.time = time;
    player.buffer_length = buffer_length;
    player.kbps = kbps;
    player.fps = fps;
    player.rtime = rtime;

    player.on_player_timer(time, buffer_length, kbps, fps, rtime);
  }

  __srs_on_player_empty(id, time) {
    var player = this.__srs_find_player(id);
    player.__fluency.on_stream_empty(time);
    player.on_player_empty(time);
  }

  __srs_on_player_full(id, time) {
    var player = this.__srs_find_player(id);
    player.__fluency.on_stream_full(time);
    player.on_player_full(time);
  }

  __srs_on_player_status(id, code, desc) {
    var player = this.__srs_find_player(id);
    player.on_player_status(code, desc);

    if (code != "closed") {
      return;
    }
    for (var i = 0; i < SrsPlayer.__players.length; i++) {
      var player = SrsPlayer.__players[i];

      if (player.id != this.id) {
        continue;
      }

      SrsPlayer.__players.splice(i, 1);
      break;
    }
  }
}
