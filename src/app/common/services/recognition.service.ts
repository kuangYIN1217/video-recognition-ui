import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

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
}