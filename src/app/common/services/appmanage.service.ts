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
  inputPath:string;
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
  createApp(appName,appCate,applicationChannels,importPath,userId){
    let path = "/api/application";
    let body = JSON.stringify({
      "applicationChannels":applicationChannels ,
      "applicationId": 0,
      "applicationName": appName,
      "applicationType": appCate,
      "createTime": null,
      "userId": userId
    });
    if(importPath){
      this.inputPath = encodeURI(importPath);
    }
    let headers = this.getHeaders();
    headers.append('inputPath',this.inputPath);
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers})
      .map((response: Response) => {
      console.log(response);
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  createApplication(appName,appCate,userId){
    let path = "/api/createApplication";
    let applicationDTO = JSON.stringify(    {
      "applicationName": appName,
      "applicationType": appCate,
      "userId": userId
    });
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,applicationDTO, { headers : headers} )
      .map((response: Response) => {
        return response;
      });
  }
  downTemplate(){
    let path = "/api/template";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        return response;
      });
  }
  getAppInfo(){
    let path = "/api/applications";
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
    let path = "/api/application/"+id;
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
  getAllDate(cate,id){
    let path = "/api/count/"+cate+"/"+id;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path,{ headers: headers })
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  updateApp(id,appName){
    let path = "/api/UpdateApplicationName";
    let body = JSON.stringify({
      "applicationId": id,
      "name": appName
    });
    console.log(body);
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
      console.log(response);
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
  getApplicationType(appType,userId){
    let path = "/api/getApplicationByTypeAndUserId/"+appType+"/"+userId;
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
