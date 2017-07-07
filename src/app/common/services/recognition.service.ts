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
    return 'Bearer '+ sessionStorage['authenticationToken'];
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

  setRecognitions( channelIds , recognitions) {
    console.log(channelIds)
    console.log(recognitions)
    let body ="channelId=" + channelIds + "&recognitionCategory=" + recognitions;
    let path = "/api/UpadateApplicationChannelRecognitionCategory";
    console.log(path);
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    headers.append('Authorization',this.getAuthorization());
    return this.http.post(this.SERVER_URL + path, body ,{headers: headers})
      .map((response: Response) => {
        if (response && response.json()) {
          if(response.status==200){
            return response.json();
          }
        }
      });
  }

}
