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
  getAllWarn(id,page=0,size=10){
      let path = "/api/findAlarmByApplication/"+id+"?page="+page+"$size="+size;
      let headers = this.getHeaders();
      return this.http.get(this.SERVER_URL+path, { headers : headers})
        .map((response: Response) => {
          if (response && response.json()) {
            return response.json();
          }
        });
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
        if (response) {
          if(response.status==200){
            return response;
          }
        }
      });
  }
  editRuleSave(chanId,ruleId,name,obj,car,status){
    let path = "/api/UpdateAlarmRule";
    let body = JSON.stringify({
      "alarmRuleStatus": status,
      "alarmTarget": obj,
      "ruleId": ruleId,
      "ruleName": name,
      "targetFeature": car
    });
    let headers = this.getHeaders();
    headers.append('channelIds',chanId);
    return this.http.put(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          if(response.status==200){
            return response;
          }
        }
      });
  }
  editRuleSave1(ruleId,name,obj,car,status){
    debugger
    let path = "/api/UpdateAlarmRule";
    let body = JSON.stringify({
      "alarmRuleStatus": status,
      "alarmTarget": obj,
      "ruleId": ruleId,
      "ruleName": name,
      "targetFeature": car
    });
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          if(response.status==200){
            return response;
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
            return response;
          }
        }
      });
  }
  searchRules(id,name,chanId,obj,status,page=0,size=10){
    if(name==undefined){
      name=null;
    }
    let path = "/api/findRuleDynamic/"+id+"/"+name+"/"+chanId+"/"+obj+"/"+status+"?page="+page+"&size="+size;
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
  searchWarns(id,name,ruleId,status,page=0,size=10,start,end){
    let path = "/api/findAlarmLiveDynamic/"+id+"/"+name+"/"+ruleId+"/"+status+"/"+start+"/"+end+"?page="+page+"&size="+size;
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
  searchOffWarns(id,task,ruleId,status,page=0,size=10,start,end){
    let path = "/api/findAlarmLiveDynamic/"+id+"/"+task+"/"+ruleId+"/"+status+"/"+start+"/"+end+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,{ headers: headers })
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
