import {Headers, Http, Response} from "@angular/http";
import {Injectable, Query} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {SERVER_URL} from "../../app.constants";

@Injectable()
export class RecognitionService {
  SERVER_URL: string = SERVER_URL;
  constructor(private http: Http) { }

  getAuthorization(){
    return 'Bearer '+ localStorage['authenticationToken'];
  }

  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    headers.append('Authorization',this.getAuthorization());
    return headers;
  }

  getRecognitions() {
    let path = "/api/recognitionCategories";
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
  getRecognition() {
    let path = "/api/findClassification";
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
  setRecognitions( channelIds , recognitions,targetSet) {
    let path = "/api/UpdateApplicationChannelRecognitionCategory";
    let body = JSON.stringify({
      "channelId":channelIds,
      "recognitionCategory":recognitions,
      "targetSet": targetSet
    });
    //let body ="channelId=" + channelIds + "&recognitionCategory=" + recognitions+"&targetSet=" + targetSet;
    //console.log(body);
    let headers = this.getHeaders();
    //let headers = new Headers();
    //headers.append('Content-Type','application/x-www-form-urlencoded');
    //headers.append('Authorization',this.getAuthorization());
    return this.http.post(this.SERVER_URL + path, body ,{headers: headers})
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }
  getRecognitionFile(id){
    let path = "/download/targetJson"+id+".txt";
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
