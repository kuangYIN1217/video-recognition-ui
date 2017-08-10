import { Component } from '@angular/core';
import {SERVER_URL} from "app/app.constants";
import {FileUploader} from "ng2-file-upload";
@Component({
  selector: 'create-text',
  styleUrls: ['./css/createtext.component.css'],
  templateUrl: './templates/createtext.html',
  providers: []
})
export class CreateTextComponent {
  SERVER_URL = SERVER_URL;
  taskTitle:string="新建任务";
  checked:number=0;
  constructor() {

  }
/*  Headers: Headers = this.appManageService.getHeaders();
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/upload",
    method: "POST",
    itemAlias: "file",
  });*/
  checkedRlues(){
    if(this.checked==0){
      this.checked=1;
    }else{
      this.checked=0;
    }
  }
}
