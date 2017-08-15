import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {SERVER_URL} from "../../app.constants";
import {plainToClass} from "class-transformer";

@Injectable()
export class WarnService {
  SERVER_URL: string = SERVER_URL;

  constructor(private http: Http) {
  }

  getAuthorization() {
    return 'Bearer ' + sessionStorage['authenticationToken'];
  }

  getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.getAuthorization());
    return headers;
  }
  getWarnRules(id){
    let path = "/api/getAllRule/"+id;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getChanName(id){
    let path = "/api/getApplicationChannelNameByApplication/"+id;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getWarnChannel(id){
    let path = "/api/findByApplication/"+id;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getWarnObj(){
    let path = "/api/alarmTarget";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllRlues(id,page=0,size=10){
    let path = "/api/getAllRule/"+id+"?page="+page+"&size"+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  createWarn(appId,chanId,name,obj,car,status){
    let path = "/api/alarmRule";
    let body = JSON.stringify({
      "alarmRuleStatus": status,
      "alarmTarget": obj,
      "createTime": null,
      "ruleId": 0,
      "ruleName":name ,
      "applicationChannels":null,
      "targetFeature": car
    });
    let headers = this.getHeaders();
    headers.append('channelIds',chanId);
    headers.append('applicationId',appId);
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  editRuleSave(ruleId,name,obj,car,status){
    let path = "/api/alarmRule";
    let body = JSON.stringify({
      "alarmRuleStatus": status,
      "alarmTarget": obj,
      "ruleId": ruleId,
      "ruleName": name,
      "targetFeature": car
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
  deleteRule(id){
    let path = "/api/deleteAlarmRule/"+id;
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
  searchRules(id,name,obj,status,page=0,size=10){
    let path = "/api/findRuleDynamic";
    let body = JSON.stringify({
      "applicationId":id,
      "ruleName": name,
      "alarmTarget": obj,
      "status": status,
      "page": page,
      "size":size ,
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
  searchWarns(id,name,ruleId,status,page=0,size=10,start,end){
    if(status=='全部'){
      status=null;
    }
    let path = "/api/findAlarmLiveDynamic";
    let body = JSON.stringify({
      "applicationId":id,
      "channelName": name,
      "alarmStatus": status,
      "ruleId":ruleId,
      "startTime": start,
      "endTime": end
    });
    console.log(body);
    let headers = this.getHeaders();
    headers.append('page',page.toString());
    headers.append('size',size.toString());
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  warnRuleSwitch(id,status){
    let path = "/api/AlarmRuleSwitch";
    let body = JSON.stringify({
      "ruleId":id,
      "ruleStatus":status
    });
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL + path,body,{headers: headers})
      .map((response: Response) => {
        if (response) {
            return response;
        }
      });
  }
}
