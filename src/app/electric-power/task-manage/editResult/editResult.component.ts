import { Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ElectricService} from "../../../common/services/electric.service";
import {SERVER_URL} from "../../../app.constants";
import {FileUploader} from "ng2-file-upload";
@Component({
  selector: 'edit-result',
  styleUrls: ['./editResult.component.css'],
  templateUrl: './editResult.component.html',
  providers: [ElectricService]
})
export class EditResultComponent {
  allInfo:any={};
  imageArr:any[]=[];
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/uploadPatrolZipFile",
    method: "POST",
    itemAlias: "file",
  });
    constructor(private router:Router,private route: ActivatedRoute,private electricService:ElectricService){
/*      this.route.queryParams.subscribe(params => {
          this.allInfo = JSON.parse(params["allInfo"]);
          console.log(this.allInfo);
      })*/
    }
    save(){

    }
    selectedFileOnChanged(){
      this.uploader.queue[0].upload();
      this.uploader.queue[0].onSuccess = (response: any, status: any, headers: any) => {
          this.imageArr.push(response);
      }
    }
    cancel(){
      this.router.navigate(['../taskresult']);
    }
}
