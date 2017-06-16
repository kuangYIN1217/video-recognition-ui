/**
 * Created by zhy on 2017/6/16.
 */
export const __fill_query = (query_string, obj) => {
// pure user query object.
  obj.user_query = {};

  if (query_string.length == 0) {
    return;
  }

  // split again for angularjs.
  if (query_string.indexOf("?") >= 0) {
    query_string = query_string.split("?")[1];
  }

  var queries = query_string.split("&");
  for (var i = 0; i < queries.length; i++) {
    var elem = queries[i];

    var query = elem.split("=");
    obj[query[0]] = query[1];
    obj.user_query[query[0]] = query[1];
  }

  // alias domain for vhost.
  if (obj.domain) {
    obj.vhost = obj.domain;
  }
}
export const parse_query_string = () => {
  var obj: any = {};

  // add the uri object.
  // parse the host(hostname:http_port), pathname(dir/filename)
  obj.host = window.location.host;
  obj.hostname = window.location.hostname;
  obj.http_port = (window.location.port == "")? 80:window.location.port;
  obj.pathname = window.location.pathname;
  if (obj.pathname.lastIndexOf("/") <= 0) {
    obj.dir = "/";
    obj.filename = "";
  } else {
    obj.dir = obj.pathname.substr(0, obj.pathname.lastIndexOf("/"));
    obj.filename = obj.pathname.substr(obj.pathname.lastIndexOf("/"));
  }

  // pure user query object.
  obj.user_query = {};

  // parse the query string.
  var query_string = String(window.location.search).replace(" ", "").split("?")[1];
  if(query_string == undefined){
    query_string = String(window.location.hash).replace(" ", "").split("#")[1];
    if(query_string == undefined){
      return obj;
    }
  }

  __fill_query(query_string, obj);

  return obj;
}

export const get_browser_agents = () => {
  var agent = navigator.userAgent;

  /**
   WindowsPC platform, Win7:
   chrome 31.0.1650.63:
   Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36
   (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36
   firefox 23.0.1:
   Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101
   Firefox/23.0
   safari 5.1.7(7534.57.2):
   Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2
   (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
   opera 15.0.1147.153:
   Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36
   (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36
   OPR/15.0.1147.153
   360 6.2.1.272:
   Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64;
   Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729;
   .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C;
   .NET4.0E)
   IE 10.0.9200.16750(update: 10.0.12):
   Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64;
   Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729;
   .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C;
   .NET4.0E)
   */

  return {
    // platform
    Android: agent.indexOf("Android") != -1,
    Windows: agent.indexOf("Windows") != -1,
    iPhone: agent.indexOf("iPhone") != -1,
    // Windows Browsers
    Chrome: agent.indexOf("Chrome") != -1,
    Firefox: agent.indexOf("Firefox") != -1,
    QQBrowser: agent.indexOf("QQBrowser") != -1,
    MSIE: agent.indexOf("MSIE") != -1,
    // Android Browsers
    Opera: agent.indexOf("Presto") != -1,
    MQQBrowser: agent.indexOf("MQQBrowser") != -1
  };

}
