import { Component,Input,Output,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {AccountService} from "../../common/services/account.service";

import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'create-user',
  styleUrls: ['./createUser.component.css'],
  templateUrl: './createUser.html',
  providers: [AccountService]
})

export class CreateUserComponent {
  username:string;
  userId:number;
  required:number=0;
  name:string;
  realName:string;
  mobile:number;
  mail:string;
  password:string;
  group:string;
  groupArr:any[]=[];
  tempGroup:any[]=[];
  page: number = 0;
  pageMaxItem: number = 10;
  id:number;
  @Input() createIndex:boolean;
  @Input() userInfo:any;
  @Input() userTitle:string;
  @Output() createIndexChange: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private route: ActivatedRoute,private accountService:AccountService) {
      this.userId = parseInt(sessionStorage.getItem("userId"));
      this.username = sessionStorage.getItem("username");
      this.tempGroup=[];
      this.accountService.getAllGroup(this.username)
        .subscribe(result=>{
          this.groupArr = result.content;
          let obj = {"groupName":"不选择群组","groupId":0};
          this.groupArr.unshift(obj);
          console.log(this.groupArr);
          if(this.userTitle=="新增用户"){
            this.group = this.groupArr[0].groupName;
          }
        })
  }
/*  validName(){
    this.accountService.getUserManage(null,null,this.username)
      .subscribe(result=>{
        for(let i=0;i<result.content.length;i++){
          if(result.content[i].login==this.name||this.username==this.name){
            this.required = 10;
          }else{
            this.required = 0;
          }
        }
      })
  }*/
  validMobile(){
    if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.mobile.toString()))){
      this.required = 9;
    }else{
      this.required = 0;
    }
  }
  validMail(){
    if(!( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.mail))){
      this.required = 8;
    }else{
      this.required = 0;
    }
  }
  ngOnChanges(...args: any[]) {
    if(this.userTitle=="修改用户"){
      console.log(this.userInfo);
      this.name = this.userInfo.login;
      this.realName = this.userInfo.actualName;
      this.mobile = this.userInfo.cellphoneNumber;
      this.mail = this.userInfo.email;
      this.password = this.userInfo.password;
      this.id = this.userInfo.id;
      if(this.userInfo.groups.length==0){
        this.group = "不选择群组";
      }else{
        this.group = this.userInfo.groups[0].groupName;
      }
    }else if(this.userTitle=="新增用户"){
      this.name = '';
      this.realName = '';
      this.mobile = null;
      this.mail = '';
      this.password = '';
      this.group = "不选择群组";
    }
  }
  validSpace(){
    if(this.name==''){
      this.required=1;
      return false;
    }else{
      this.required=0;
    }
    if(this.realName=='') {
      this.realName=null;
    }
    if(this.mobile==null){
      this.required=2;
      return false;
    }else{
      this.required=0;
    }
    if(this.mail==''){
      this.required=3;
      return false;
    }else{
      this.required=0;
    }
    if(this.password==''){
      this.required=4;
      return false;
    }else{
      this.required=0;
    }
    if(this.group=="不选择群组"){
      this.tempGroup=[];
    }else{
      for(let i=0;i<this.groupArr.length;i++){
        if(this.groupArr[i].groupName==this.group){
          this.tempGroup.push(this.groupArr[i]);
        }
      }
    }
  }
  create(){
    this.validSpace();
    this.accountService.createUser(this.name,this.realName,this.mobile,this.mail,this.password,this.tempGroup)
      .subscribe(
        (data) => {
          this.back();
        },
        (err) => {
          console.log(err.text())
          if(err.text()=="userexists"){
            this.required = 10;
          }
          if(err.text()=="emailexists"){
            this.required = 11;
          }
        }
      );
  }
  update(){
    this.validSpace();
    this.accountService.updateUser(this.id,this.name,this.realName,this.mobile,this.mail,this.password,this.tempGroup)
      .subscribe(result=> {
        this.back();
      })
  }
  back(){
    this.createIndex=false;
    this.createIndexChange.emit(this.createIndex);
  }
}
