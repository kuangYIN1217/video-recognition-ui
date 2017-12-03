import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

import {Observable} from 'rxjs/Rx';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
// import 'rxjs/add/operator/toPromise';

import {SERVER_URL} from "../../app.constants";

@Injectable()
export class AccountService {
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
  getUserInfo(username: string){
    let path = "/api/users/"+username;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllAuthories(username: string){
    let path = "/api/findAllGroupsByCreator/"+username;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllGroup(username){
    let path = "/api/findGroupsByCreator/"+username;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  createUser(name,realName,mobile,mail,password,group){
    let path = "/api/users";
    let body = JSON.stringify(
    {
      "activated": true,
      "actualName": realName,
      "authorities": [
      "ROLE_USER"
    ],
      "cellphoneNumber": mobile,
      "email": mail,
      "groups": group,
      "identity": "个人",
      "langKey": "zh-cn",
      "login": name,
      "password": password,
    });
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
          if (response) {
            return response;
        }
      })
  }
  getMonitorinmg(username,login,start,end,page=0,size=10){
    let path = "/api/user_monitoring/"+username+"/"+login+"/"+start+"/"+end+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  getAllGroups(username,groupName,page=0,size=10){
    let path = "/api/findGroupsLikeByCreator/"+username+"/"+groupName+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  createGroups(group){
    let path = "/api/createGroup";
    let body = JSON.stringify(group);
    console.log(body);
    let headers = this.getHeaders();
    return this.http.post(this.SERVER_URL+path,body, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  updateGroups(group){
    let path = "/api/updateGroup";
    let body = JSON.stringify(group);
    console.log(body);
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,body, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
  updateUser(id,name,realName,mobile,mail,password,group){
    let path = "/api/users";
    let body = JSON.stringify(
      {
        "id": id,
        "activated": true,
        "actualName": realName,
        "authorities": [
          "ROLE_USER"
        ],
        "cellphoneNumber": mobile,
        "email": mail,
        "groups": group,
        "identity": "个人",
        "langKey": "zh-cn",
        "login": name,
        "password": password,
      });
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          return response;
        }
      });
  }
  deleteUser(login){
    let path = "/api/batchDeleteUsers?logins="+login;
    let headers = this.getHeaders();
    return this.http.delete(this.SERVER_URL+path,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          if(response.status==200) {
            return response;
          }
        }
      });
  }
  deleteGroup(group){
    let path = "/api/deleteGroups/"+group;
    let headers = this.getHeaders();
    return this.http.delete(this.SERVER_URL+path,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          if(response.status==200) {
            return response;
          }
        }
      });
  }
  saveUser(id,groupId,authorities,identity,password,accountName,realName,country,prov,city,dist,detailAddress,contactPhone){
    let path = "/api/users";
    let body = JSON.stringify({
      "activated": true,
      "actualName": realName,
      "administrativeRegion":dist,
      "authorities": authorities,
      "cellphoneNumber": contactPhone,
      "city": city,
      "country":country,
      "detailedAddress": detailAddress,
      "groups": groupId,
      "id": id,
      "identity": identity,
      "langKey": "zh-cn",
      "login": accountName,
      "password": password,
      "province": prov
    });
    console.log(body);
    let headers = this.getHeaders();
    return this.http.put(this.SERVER_URL+path,body,{ headers: headers })
      .map((response: Response) => {
        if (response) {
          if(response.status==200) {
            return response;
          }
        }
      });
  }
  getUserManage(login,phone,creator,page=0,size=10){
    let path = "/api/dynamicUserManage/"+login+"/"+phone+"/"+creator+"?page="+page+"&size="+size;
    let headers = this.getHeaders();
    return this.http.get(this.SERVER_URL+path, { headers : headers} )
      .map((response: Response) => {
        if (response && response.json()) {
          return response.json();
        }
      });
  }
}
