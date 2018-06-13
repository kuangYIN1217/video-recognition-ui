import { Component,Input,Output,EventEmitter } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {calc_height} from "../../../common/ts/calc_height";

import {ElectricService} from "../../../common/services/electric.service";
@Component({
  selector: 'apt-custom',
  styleUrls: ['./custom.component.css'],
  templateUrl: './custom.component.html',
  providers: [ElectricService]
})

export class CustomComponent {
  @Input() show:boolean;
  @Input() name:string;
  @Input() unitId:number;
  @Output() unitNameChange: EventEmitter<any> = new EventEmitter();
  @Output() lineNameChange: EventEmitter<any> = new EventEmitter();
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  unitName:string='';
  required:number = 0;
  lineName:string='';
  appId:string;
  constructor(private route:ActivatedRoute,private router:Router,private electricService:ElectricService) {
    this.appId = window.sessionStorage.getItem("applicationId");
  }
  ngOnInit() {

  }

  save(){
    if(this.name=='新建单位'){
      if(this.unitName==''){
        this.required = 1;
        return false;
      }else{
        this.electricService.createUnit(this.appId,this.unitName)
          .subscribe(result=>{
            if(result.text()=='true'){
              //this.name = '新建线路';
              this.show = false;
              this.unitNameChange.emit(this.show);
            }
          })
      }
    }else if(this.name='新建线路'){
      if(this.lineName==''){
        this.required = 1;
        return false;
      }else{
        this.electricService.createLine(this.unitId,this.lineName)
          .subscribe(result=>{
            if(result.text()=='true'){
              this.show = false;
              this.lineNameChange.emit(this.show);
            }
          })
      }
    }
  }
  back(){
    this.show = false;
  }
  ngOnChanges(...args: any[]) {
    this.lineName = '';
    this.unitName = '';
    this.required = 0;
  }
}
