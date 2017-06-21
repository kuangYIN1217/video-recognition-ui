import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {SERVER_URL} from "../../app.constants";
import {channelInfo} from "../defs/resources";
import {plainToClass} from "class-transformer";

@Injectable()
export class ChannelService {
  SERVER_URL: string = SERVER_URL;
  constructor(private http: Http) { }

  getAuthorization(){
    return 'Bearer '+ sessionStorage['authenticationToken'];
  }

  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    headers.append('Authorization',this.getAuthorization());
    return headers;
  }
  getAllChannel(){
    let path = "/api/applicationChannel";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return plainToClass(channelInfo, response.json());
        }
      });
  }

  createChannel(chanName,chanAddr,protocol,status){
    let path = "/api/applicationChannel";
    let body = JSON.stringify({
      "channelAddress": chanAddr,
      "channelId": 0,
      "channelName": chanName,
      "channelOrder": null,
      "channelProtocol": "RTMP",
      "channelStatus": status
    });
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  updateChannel(id,chanName,chanAddr,protocol,status){
    let path = "/api/applicationChannel";
    let body = JSON.stringify({
      "channelAddress": chanAddr,
      "channelId": id,
      "channelName": chanName,
      "channelOrder": null,
      "channelProtocol": protocol,
      "channelStatus": status
    });
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  delChannel(id){
    let path = "/api/applicationChannel/"+id;
    let headers = this.getHeaders();
    return this.http.delete(this.SERVER_URL+path,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          if(response.status==200){
            return "success";
          }else{
            return "fail";
          }
        }
      });
  }
  run(id,status){
    let path = "/api/applicationChannelSwitch/"+ id + "/" + status ;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL + path, {headers: headers})
      .map((response: Response) => {
        if (response) {
          return response;
        }
      });
  }
}
