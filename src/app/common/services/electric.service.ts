import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

import {Observable} from 'rxjs/Rx';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
// import 'rxjs/add/operator/toPromise';

import {SERVER_URL} from "../../app.constants";

@Injectable()
export class ElectricService {
  SERVER_URL: string = SERVER_URL;
  inputPath: string;

  constructor(private http: Http) {
  }

  getAuthorization() {
    return 'Bearer ' + localStorage['authenticationToken'];
  }

  getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.getAuthorization());
    return headers;
  }
  getSynchronizationInfo(appId){
    let path = "/api/ifSynchronizePatrolInfo/"+appId;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getTaskByAppId(appId){
    let path = "/api/getTaskByApplicationId/"+appId;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllUnit(id){
    let path = "/api/getUnitInfoByApplicationId/"+id;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllLine(id){
    let path = "/api/getLineInfoByUnit/"+id;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllTowersByAppId(appId){
    let path = "/api/getAllTowers/"+appId;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllTower(id){
    let path = "/api/getPatrolInfoByLineId/"+id;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  deletePatrolTowers(id){
  let path = "/api/deletePatrolTowers/"+id;
    let headers = this.getHeaders();
    return this.http.delete(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
}
  createUnit(appId,unit){
    let path = "/api/createPatrolUnit/";
    let body = JSON.stringify({
      "applicationId": appId,
      "unitName": unit
    })
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  createLine(unitId,lineName){
    let path = "/api/createPatrolLine";
    let body = JSON.stringify({
      "patrolLineName": lineName,
      "patrolUnitId": unitId
    })
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  createInspection(appId,unit,voltageGrade,line,towerNo,longitude,latitude,notes){
    let path = "/api/createElectricalPatrol";
    let body = JSON.stringify(
      {
      "applicationId": appId,
      "lineId": line,
      "notes": notes,
      "towerLatitude": latitude,
      "towerLongitude": longitude,
      "towerNum": towerNo,
      "unitId": unit,
      "voltageGrade": voltageGrade
      });
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  updateInspection(appId,towerId,unit,voltageGrade,line,towerNo,longitude,latitude,notes,createTime){
    let path = "/api/updatePatrolTowerInfo";
    let body = JSON.stringify(
      {
        "applicationId": appId,
        "createTime":createTime,
        "notes": notes,
        "patrolLine": {
          "lineId": line,
          "unitId": unit
        },
        "patrolUnit": {
          "applicationId": appId,
          "unitId": unit,
        },
        "towerId":towerId,
        "towerLatitude":latitude,
        "towerLongitude": longitude,
        "towerNum": towerNo,
        "voltageGrade": voltageGrade
      });
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  getDateManage(appId,unitId,lineId,towerId,page,size){
    let path = "/api/getElectricalPatrolInfoForManage/"+appId+"/"+unitId+"/"+lineId+"/"+towerId+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  searchTask(appId,name,status,page=0,size=10){
    let path = "/api/findTasksByApplicationId/"+appId+"/"+name+"/"+status+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllFlaw(){
    let path = "/api/getAllFlawCategorys";
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  createTask(appId,pathArr,flaw,name,size){
    let path = "/api/createOrUpdatePatrolTask";
    let body = JSON.stringify(
      {
        "applicationId": appId,
        "filePaths": pathArr,
        "flawCategorys": flaw,
        "taskId": 0,
        "taskName": name,
        "zipSize": size
      }
    );
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  updateTask(appId,pathArr,flaw,taskId,name,size){
    let path = "/api/createOrUpdatePatrolTask";
    let body = JSON.stringify(
      {
        "applicationId": appId,
        "filePaths": pathArr,
        "flawCategorys": flaw,
        "taskId": taskId,
        "taskName": name,
        "zipSize": size
      }
    );
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  searchMapInfo(appId,lineId,taskId){
    let path = "/api/getElectricalPatrolInfoForMap/"+appId+"/"+lineId+"/"+taskId;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getMapTask(appId){
    let path = "/api/getTaskByApplicationId/"+appId;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getMapLine(appId){
    let path = "/api/getLineInfoByApplicationId/"+appId;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getTaskResultSearch(taskId,lineId,towerId){
    let path = "/api/getFlawInfoByTaskId/"+taskId+"/"+lineId+"/"+towerId;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getFlawPart(taskId){
    let path = "/api/getFlawPartForConditions/"+taskId;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getTaskResult(taskId,lineId,towerId,flawPart,infoStatus,page=0,size=10){
    let path = "/api/getFlawInfoByConditions/"+taskId+"/"+lineId+"/"+towerId+"/"+flawPart+"/"+infoStatus+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getSynchronizeInfo(anotherApplicationId,appId){
    let path = "/api/syncPatrolInfo";
    let body = JSON.stringify(
      {
        "anotherApplicationId": anotherApplicationId,
        "applicationId": appId
      }
    );
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  neglect(flawInfoId){
    let path = "/api/ignoreFlawInfo/"+flawInfoId;
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  saveExcel(appId,filepath){
    let path = "/api/saveTowerByExcel";
    let body = JSON.stringify(
      {
        "applicationId": appId,
        "filePath": filepath
      }
    );
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  deleteTask(id){
    let path = "/api/deleteTaskByIds/"+id;
    let headers = this.getHeaders();
    return this.http.delete(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  modifyFlaw(flawCategory,flawFilePath,flawInfo,flawProperty,infoId,infoStatus,patrolTowerPart){
    let path = "/api/modifyFlawInfo";
    let body = JSON.stringify(
      {
        "flawCategory": flawCategory,
        "flawFilePath": flawFilePath,
        "flawInfo": flawInfo,
        "flawProperty": flawProperty,
        "infoId": infoId,
        "infoStatus": infoStatus,
        "patrolTowerPart": patrolTowerPart
      }
    );
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  taskSwitch(status,taskId,viewStatus){
    let path = "/api/patrolTaskSwitch";
    let body = JSON.stringify(
      {
        "status": status,
        "taskId": taskId,
        "viewStatus":viewStatus
      }
    );
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      })
  }
  dataStaticSearch(lineId,towerId,taskId,lineOrTower,startTime,endTime){
    let path = "/api/patrolDataCount/"+lineId+"/"+towerId+"/"+taskId+"/"+lineOrTower+"/"+startTime+"/"+endTime;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  dataStaticResult(lineId,towerId,taskId,lineOrTower,startTime,endTime,page=0,size=10){
    let path = "/api/patrolDataCountForPage/"+lineId+"/"+towerId+"/"+taskId+"/"+lineOrTower+"/"+startTime+"/"+endTime+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers})
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
}
