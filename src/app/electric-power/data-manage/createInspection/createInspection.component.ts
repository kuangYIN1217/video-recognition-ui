import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {calc_height} from "../../../common/ts/calc_height";
import {ElectricService} from "../../../common/services/electric.service";
@Component({
  selector: 'create-inspection',
  styleUrls: ['./createInspection.component.css'],
  templateUrl: './createInspection.component.html',
  providers: [ElectricService]
})

export class CreateInspectionComponent {
  appId:string;
  appCate:string;
  title:string;
  voltageGrade:string='';
  towerNo:string='';
  unitArr:any[]=[];
  lineArr:any[]=[];
  unit:string='';
  show:boolean = false;
  name:string='';
  unitId:number;
  lineId:number;
  line:string='';
  timeOut:any;
  required:number=0;
  longitude:number;
  latitude:number;
  notes:string='';
  towerId:number;
  createTime:string;
  constructor(private route:ActivatedRoute,private router:Router,private electricService:ElectricService) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.appCate = window.sessionStorage.getItem("applicationType");
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.unit =  params['unitName'];
      this.line = params['lineName'];
      this.voltageGrade = params['voltageGrade'];
      this.towerNo = params['towerNum'];
      this.longitude = params['towerLongitude'];
      this.latitude = params['towerLongitude'];
      this.notes = params['notes'];
      this.towerId = params['towerId'];
      this.createTime = params['createTime'];
    });
    this.getAll();
  }
  getAll(){
    this.electricService.getAllUnit(this.appId)
      .subscribe(result=>{
        console.log(result);
        this.unitArr = result;
        let obj:any = {};
        obj.unitName = "自定义";
        this.unitArr.push(obj);
        this.unit = result[0].unitName;
        if(this.unit=='自定义'){
          this.changeUnit();
        }
        this.getLine(result[0].unitId);
      })
  }
  changeUnit(){
    for(let i=0;i<this.unitArr.length;i++){
      if(this.unit!='自定义'){
        if(this.unit==this.unitArr[i].unitName){
          this.unitId = this.unitArr[i].unitId;
          this.getLine(this.unitId);
        }
      }
    }
    if(this.unit == '自定义'){
      this.show = true;
      this.name = '新建单位';
    }else{
      this.show = false;
    }
  }
  changeLine(){
    if(this.line == '自定义'){
      this.show = true;
      this.name = '新建线路';
      for(let i=0;i<this.unitArr.length;i++){
        if(this.unit==this.unitArr[i].unitName){
          this.unitId = this.unitArr[i].unitId;
        }
      }
    }else{
      this.show = false;
    }
  }
  getLine(unitId){
    this.electricService.getAllLine(unitId)
      .subscribe(result=>{
        this.lineArr = result;
        let obj:any = {};
        obj.lineName = "自定义";
        this.lineArr.push(obj);
        this.line = result[0].lineName;
        this.changeLine();
      })
  }
  unitNameChange(event){
    //this.unit = event;
    this.getAll();
  }
  lineNameChange(event){
    //this.line = event;
    this.getAll();
  }
  create(){
    this.validate();
    this.electricService.createInspection(this.appId,this.unitId,this.voltageGrade,this.lineId,this.towerNo,this.longitude,this.latitude,this.notes)
      .subscribe(result=>{
        this.router.navigate(['../datamanage']);
      })
  }
  validate(){
    if(this.unit=='自定义'){
      this.required = 5;
      return false;
    }else{
      this.required = 0;
    }
    if(this.line=='自定义'){
      this.required = 5;
      return false;
    }else{
      this.required = 0;
    }
    if(this.voltageGrade==''){
      this.required = 1;
      return false;
    }else{
      this.required = 0;
    }
    if(this.towerNo==''){
      this.required = 2;
      return false;
    }else{
      this.required = 0;
    }
    if(this.longitude==undefined){
      this.required = 3;
      return false;
    }else{
      this.required = 0;
    }
    if(this.latitude==undefined){
      this.required = 4;
      return false;
    }else{
      this.required = 0;
    }
    for(let i=0;i<this.unitArr.length;i++){
      if(this.unit == this.unitArr[i].unitName){
        this.unitId = this.unitArr[i].unitId;
      }
    }
    for(let j=0;j<this.lineArr.length;j++){
      if(this.line == this.lineArr[j].lineName){
        this.lineId = this.lineArr[j].lineId;
      }
    }
    console.log(this.appId,this.unitId,this.voltageGrade,this.lineId,this.towerNo,this.longitude,this.latitude,this.notes);
  }
  update(){
    this.validate();
    this.electricService.updateInspection(this.appId,this.towerId,this.unitId,this.voltageGrade,this.lineId,this.towerNo,this.longitude,this.latitude,this.notes,this.createTime)
      .subscribe(result=>{
        this.router.navigate(['../datamanage']);
      })
  }
  back(){
    this.router.navigate(['../datamanage']);
  }
  ngOnInit() {
    calc_height(document.getElementById('content'));
  }
}
