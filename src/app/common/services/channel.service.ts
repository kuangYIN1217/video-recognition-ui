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
  getPage(applicationId,page=0,size=10){
    let path = "/api/applicationChannelByApplication/"+applicationId+"?page="+page+"&size="+size+"&sort=channelOrder,asc";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  createChannel(id,chanAddr,chanName,protocol,status){
    let path = "/api/applicationChannel";
    let body = JSON.stringify({
      "application": id,
      "channelAddress": chanAddr,
      "channelName": chanName,
      "channelOrder": null,
      "channelOut": null,
      "channelProtocol": "RTMP",
      "channelStatus":status,
      "recognitionCategory": null
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
  updateChannel(appId,id,order,chanName,chanAddr,protocol,status){
    let path = "/api/applicationChannel";
    let body = JSON.stringify({
      "application": appId,
      "channelAddress": chanAddr,
      "channelId": id,
      "channelName": chanName,
      "channelOrder": order,
      "channelOut": null,
      "channelProtocol": "RTMP",
      "channelStatus": status,
      "recognitionCategory": null
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
  getDirection(id,direction){
    console.log(id,direction);
    let path = "/api/changeChannelOrder/"+ id+"/"+ direction ;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL + path, {headers: headers})
      .map((response: Response) => {
        if (response && response.json()){
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  getOpenChannelById(id) {
    let path = "/api/openApplicationChannelByApplication/"+ id ;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL + path, {headers: headers})
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
}
