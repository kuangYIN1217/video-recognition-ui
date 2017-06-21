import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {SERVER_URL} from "../../app.constants";
import {appManageInfo} from "../defs/resources";
import {plainToClass} from "class-transformer";

@Injectable()
export class AppManageService {
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
  createApp(appName,appCate,icon,channelName,channelAddress,protocol){
    let path = "/api/appllication";
    let body = JSON.stringify({
      "applicationChannels": [
        {
          "channelAddress":channelAddress,
          "channelId": 0,
          "channelName": channelName,
          "channelOrder": null,
          "channelProtocol": protocol,
          "channelStatus": 0
        }
      ],
      "applicationId": 0,
      "applicationName": appName,
      "applicationType": appCate,
      "createTime": null,
      "icon": icon
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
  getAppInfo(){
    let path = "/api/appllications";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return plainToClass(appManageInfo, response.json());
        }
      });
  }
  delInfo(id){
    console.log(id);
    let path = "/api/appllication/"+id;
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
  updateApp(id,time,appName,appCate,channelName,channelAddress,protocol,icon){
    let path = "/api/appllication";
    let body = JSON.stringify({
      "applicationChannels": [
        {
          "channelAddress":channelAddress,
          "channelId": 0,
          "channelName": channelName,
          "channelOrder": null,
          "channelProtocol": protocol,
          "channelStatus": null
        }
      ],
      "applicationId": id,
      "applicationName": appName,
      "applicationType": appCate,
      "createTime": time,
      "icon": icon
    });
    console.log(body);
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
  getCategory(){
    let path = "/api/applicationType";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  getProtocol(){
    let path = "/api/applicationProtocol";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
}
