import { Component } from '@angular/core';
import {calc_height} from "../../common/ts/calc_height";
import {AccountService} from "../../common/services/account.service";
declare var $:any;
@Component({
  selector: 'account-manage',
  styleUrls: ['./account.manage.component.css'],
  templateUrl: './account.manage.html',
  providers: [AccountService]
})

export class AccountManageComponent {
  prov:string;
  city:string;
  dist:string;
  username:string;
  password:string;
  personInfo:any={};
  accountName:string;
  realName:string;
  country:string;
  detailAddress:string;
  contactPhone:number;
  required:number=0;
  groupId:any[]=[];
  id:number;
  constructor(private accountService:AccountService) {
   this.username = sessionStorage.getItem('username');
   this.password = sessionStorage.getItem('password');

  }

  ngOnInit(){
    calc_height(document.getElementById('account-manage'));
/*    $("#city_4").citySelect({
      prov: "省",
      city: "市",
      dist: "区",
    });*/
    this.accountService.getUserInfo(this.username)
      .subscribe(result=>{
        this.personInfo = result;
        this.id = this.personInfo.id;
        this.accountName = this.personInfo.login;
        this.realName = this.personInfo.actualName;
        this.country = this.personInfo.country;
        this.prov = this.personInfo.province;
        this.city = this.personInfo.city;
        this.dist=this.personInfo.administrativeRegion;
        this.detailAddress = this.personInfo.detailedAddress;
        this.contactPhone = this.personInfo.cellphoneNumber;
      });
  }
  save(){
    this.groupId=[];
    this.city = $("#city1").val();
    this.dist = $("#district1").val();
    if(this.accountName==undefined||this.accountName==''){
      this.required=1;
      return false;
    }else{
      this.required=0;
    };
    if(this.realName==undefined||this.realName==''){
      this.required=2;
      return false;
    }else{
      this.required=0;
    };
    if(this.country==undefined||this.country==''){
      this.required=3;
      return false;
    }else{
      this.required=0;
    };
    if(this.prov==undefined){
      this.required=4;
      return false;
    }else{
      this.required=0;
    };
    if(this.detailAddress==undefined||this.detailAddress==''){
      this.required=7;
      return false;
    }else{
      this.required=0;
    };
    if(this.contactPhone==undefined||this.contactPhone==null){
      this.required=8;
      return false;
    }else{
      this.required=0;
    };
    if(this.personInfo.groups.length==0){
      this.groupId=[];
    }else{
      for(let i=0;i<this.personInfo.groups.length;i++){
       let obj:any={};
       obj.groupId = this.personInfo.groups[i].groupId;
       this.groupId.push(obj);
      }
    }
    this.accountService.saveUser(this.id,this.groupId,this.personInfo.authorities,this.personInfo.identity,this.password,this.accountName,this.realName,this.country,this.prov,this.city,this.dist,this.detailAddress,this.contactPhone)
      .subscribe(result=>{
        console.log(result);
      })
  }
}
