import { Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ElectricService} from "../../../common/services/electric.service";
import {SERVER_URL} from "../../../app.constants";
import {FileUploader} from "ng2-file-upload";
declare var $:any;
@Component({
  selector: 'edit-result',
  styleUrls: ['./editResult.component.css'],
  templateUrl: './editResult.component.html',
  providers: [ElectricService]
})
export class EditResultComponent {
  SERVER_URL = SERVER_URL;
  allInfo:any={};
  part:string='';
  describe:string='';
  detailDescribe:string='';
  flawNature:string;
  flawStatus:string;
  flawNatureArr:any[]=["","一般","严重"];
  flawStatusArr:any[]=["正常","已忽略"];
  flawPhoto:string;
  photo:string;
  public uploader:FileUploader = new FileUploader({
    url: SERVER_URL+"/api/uploadFlawPic",
    method: "POST",
    itemAlias: "flawPic",
  });
    constructor(private router:Router,private route: ActivatedRoute,private electricService:ElectricService){
      this.route.queryParams.subscribe(params => {
          this.allInfo = JSON.parse(params["allInfo"]);
          //console.log(this.allInfo);
          this.part = this.allInfo.patrolTowerPart;
          this.describe = this.allInfo.flawCategory;
          this.detailDescribe = this.allInfo.flawInfo;
          this.flawNature = this.allInfo.flawProperty;
          this.flawStatus = this.allInfo.infoStatus;
          this.flawPhoto = this.allInfo.flawFilePath;
          this.photo = this.allInfo.taskFile.filePath;
      })
    }
    selectedFileOnChanged(){
      console.log(this.uploader.queue[0]);
      this.uploader.queue[0].upload();
      this.uploader.queue[0].onSuccess = (response: any, status: any, headers: any) => {
          this.flawPhoto = response;
      }
    }
  save(){
    this.electricService.modifyFlaw(this.describe,this.flawPhoto,this.detailDescribe,this.flawNature,this.allInfo.infoId,this.flawStatus,this.part)
      .subscribe(result=>{
        //console.log(result);
        window.history.back();
      })
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
    cancel(){
      window.history.back();
    }
}
