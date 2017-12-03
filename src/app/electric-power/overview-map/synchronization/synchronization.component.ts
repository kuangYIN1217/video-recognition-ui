import { Component,Input, Output,EventEmitter} from '@angular/core';
import {ElectricService} from "../../../common/services/electric.service";
declare var $:any;
@Component({
  selector: 'app-synchronization',
  templateUrl: './synchronization.component.html',
  styleUrls: ['./synchronization.component.css'],
  providers: [ElectricService]
})
export class SynchronizationComponent{
  @Input() tip_title:string;
  @Input() tip_content:string;
  @Input() deleteIndex:number;
  @Input() tip_btn:string;
  @Input() synchronizeIndex:number;
  @Input() info:any[]=[];
  @Output() synchronizationShowChange: EventEmitter<any> = new EventEmitter();
  deleted:number=0;
  show:boolean=false;
  titleShow:number = 0;
  appId:string;
  synchronizeId:number;
  constructor(private electricService:ElectricService) {
    this.appId = window.sessionStorage.getItem("applicationId");
  }
  synchronize(){
    this.synchronizeIndex = 1;
    this.tip_content = '请选择需要同步的项目';
  }
  checked(item){
    for(let i=0;i<this.info.length;i++){
      this.info[i].flag = 2;
    }
    item.flag = 1;
    this.synchronizeId = item.applicationId;
    this.titleShow = 1;
    //console.log(item);
  }
  sure(){
    if(this.titleShow==0){
      return false;
    }else{
      this.electricService.getSynchronizeInfo(this.synchronizeId,this.appId)
        .subscribe(result=>{
          console.log(result);
          this.cancel();
        })
    }
  }
  cancel(){
    this.show = false;
    this.synchronizationShowChange.emit(this.show);
  }
}
