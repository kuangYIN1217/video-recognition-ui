import {Headers, Http, Response, ResponseContentType} from "@angular/http";
import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {SERVER_URL} from "../../app.constants";
import {plainToClass} from "class-transformer";
import {isNullOrUndefined} from "util";

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
      let path = "/api/alarms/"+id+"?page="+page+"&size="+size;
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
  checkRuleName(applicationId,ruleName){
    let path = "/api/ruleName/"+applicationId+"/"+ruleName;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path,{ headers: headers })
      .map((response: Response) => {
        if (response && response.text()) {
          if(response.status==200){
            return response.text();
          }
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
    let path = "/api/recognitionCategories";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getWarnObjOne(){
    let path = "/api/findClassification";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllRlues(id,page=0,size=10){
    let path = "/api/getAllRule/"+id+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  createWarn(appId,name,obj,code,car,status,photoArr,createTime){
    let path = "/api/alarmRule";
    let body = JSON.stringify({
      "alarmRuleStatus": status,
      "recognitionCategory": {
        "cateId": obj,
        "code":code
      },
      "createTime": createTime,
      "ruleId": 0,
      "ruleName":name ,
      "applicationChannels":null,
      "targetFeature": car,
      "targetImages": photoArr
    });
    let headers = this.getHeaders();
    //headers.append('channelIds',chanId);
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
  editRuleSave(ruleId,name,obj,code,car,status,photoArr){
    let path = "/api/UpdateAlarmRule";
    let body = JSON.stringify({
      "alarmRuleStatus": status,
      "recognitionCategory": {
        "cateId": obj,
        "code":code
      },
      "ruleId": ruleId,
      "ruleName": name,
      "targetFeature": car,
      "targetImage":photoArr
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
  editRuleSave1(ruleId,name,obj,code,car,status,photoArr){
    let path = "/api/UpdateAlarmRule";
    let body = JSON.stringify({
      "alarmRuleStatus": status,
      "recognitionCategory": {
        "cateId": obj,
        "code":code
      },
      "ruleId": ruleId,
      "ruleName": name,
      "targetFeature": car,
      "targetImage":photoArr
    });
    //console.log(body);
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
  alarmExport(appId,appCate,alarmIds,sourcePath){
    let path = "/api/alarmExport?applicationId="+appId+"&applicationType="+appCate+"&alarmIds="+alarmIds+"&sourcePaths="+sourcePath
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path,{ headers: headers })
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
  searchRules(id,name,obj,status,page=0,size=10){
    //console.log(id,name,chanId,obj,status);
    let path = "/api/findRuleDynamic/"+id+"/"+name+"/"+obj+"/"+status+"?page="+page+"&size="+size+"&sort=createTime,desc";
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
  searchTime(id,name,ruleId,status,page=0,size=10,start,end){
    let path = "/api/alarm_time/"+id+"/"+name+"/"+ruleId+"/"+status+"/"+start+"/"+end+"?page="+page+"&size="+size+"&sort=alarmTime,desc";
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
  searchOffTime(id,taskId,task,ruleId,status,page=0,size=10,start,end){
    let path = "/api/alarm_time_offline/"+id+"/"+taskId+"/"+task+"/"+ruleId+"/"+status+"/"+start+"/"+end+"?page="+page+"&size="+size+"&sort=alarmTime,desc";
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
  getWarnTask(id,type){
    let path = "/api/video_offline_task/"+id+"/"+type;
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

  getWarnTaskWithTargetFeature(id){
    let path = "/api/video_offline_task/target_feature/" + id;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, {headers: headers})
      .map((response: Response) => {
        if(response && response.json()) {
          if(response.status == 200) {
            return response.json();
          }
        }
      })
  }

  setAlarmCheck(alarmsId,selected){
    let path = "/api/alarmCheck";
    let alarmDTO = JSON.stringify({
      "selected": selected,
      "alarmIds": alarmsId
    });
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path, alarmDTO,{ headers : headers})
      .map((response: Response) => {
        return response;
      });
  }
  searchWarns(id,name,ruleId,status,page=0,size=10,start,end){
    if( isNullOrUndefined(name) || name.length == 0) name = '全部';
    let path = "/api/findAlarmLiveDynamic/"+id+"/"+name.replace(/\//g,'%2F')+"/"+ruleId+"/"+status+"/"+start+"/"+end+"?page="+page+"&size="+size+"&sort=alarmTime,desc";
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
  handlingWarn(alarmId,appId){
    let path = "/api/processAlarm/"+alarmId+"/"+appId;
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
  searchOffWarns(id,taskId,task,ruleId,status,page=0,size=10,start,end){
    if(isNullOrUndefined(task) || task.length == 0) task = '全部';
    let path = "/api/findAlarmListDynamic/"+id+"/"+taskId+"/"+task.replace(/\//g,'%2F')+"/"+ruleId+"/"+status+"/"+start+"/"+end+"?page="+page+"&size="+size;
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
  warnRuleSwitch(id,status,appCate){
    let path = "/api/AlarmRuleSwitch";
    let body = JSON.stringify({
      "application": {
        "applicationType": appCate
      },
      "ruleId":id,
      "alarmRuleStatus":status
    });
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL + path,body,{headers: headers})
      .map((response: Response) => {
        if (response) {
            return response;
        }
      });
  }

  downloadFile(path) {
    path = "/api/fileDownLoad?filePath=" + path;
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path, {}, {headers: headers, responseType: ResponseContentType.Blob});
  }
}
