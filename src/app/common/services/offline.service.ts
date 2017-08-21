import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {SERVER_URL} from "../../app.constants";

@Injectable()
export class OfflineService {
  SERVER_URL: string = SERVER_URL;
  inputPath: string;

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
  create(appId,ruleId,taskName,inputPath,fileName,fileNumber) {
    let path = "/api/createOfflineTask";
    let body = JSON.stringify({
      "fileNames": fileName,
      "fileNumber": fileNumber,
      "inputPath": inputPath,
      "taskName": taskName
    });
    let headers = this.getHeaders();
    headers.append('applicationId',appId);
    headers.append('alarmRuleIds',ruleId);
    return this.http.post(this.SERVER_URL + path, body, {headers: headers})
      .map((response: Response) => {
        if (response) {
          if (response.status == 200) {
            return response;
          }
        }
      });
  }
  getWarnTask(id,page=0,size=10){
    let path = "/api/getAllOfflineTask/"+id+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  offlineSwitch(id,status){
    let path = "/api/offlineTaskSwitch";
    let body = JSON.stringify({
      "taskId": id,
      "taskStatus": status
    });
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL + path, body, {headers: headers})
      .map((response: Response) => {
        if (response) {
          if (response.status == 200) {
            return response;
          }
        }
      });
  }
  searchTask(id,name,status,page=0,size=10){
    let path = "/api/getOfflineTaskDynamic/"+id+"/"+name+"/"+status+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  delete(id){

  }
}