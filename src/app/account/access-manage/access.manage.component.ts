import { Component } from '@angular/core';
import {AccountService} from "../../common/services/account.service";
import {Page} from "app/common/defs/resources";
import {calc_height} from "../../common/ts/calc_height";
declare var $:any;
@Component({
  selector: 'access-manage',
  styleUrls: ['./access.manage.component.css'],
  templateUrl: './access.manage.html',
  providers: [AccountService]
})

export class AccessManageComponent {
  username:string;
  createIndex:boolean=false;
  userManageList:any[]=[];
  all_select:boolean;
  pageParams = new Page();
  page: number = 0;
  pageMaxItem: number = 10;
  userName:string='';
  userMobile:string='';
  userInfo:any={};
  userTitle:string;
  deleteShow:boolean = false;
  tip_title:string;
  tip_content:string;
  loginId:string;
  constructor(private accountService:AccountService) {
    this.username = sessionStorage.getItem('username');
    this.getAllUser(null,null,this.username,this.page,this.pageMaxItem);
  }
  getAllUser(login,phone,creator,page,size){
    this.accountService.getUserManage(login,phone,creator,page,size)
      .subscribe(result=>{
        this.userManageList = result.content;
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
      })
  }
  ngOnInit() {
    calc_height(document.getElementById('account-manage'));
  }
  createIndexChange(){
    this.getAllUser(null,null,this.username,this.page,this.pageMaxItem);
  }
  getPageData(paraParam){
    this.valid();
    this.getAllUser(this.userName,this.userMobile,this.username,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  valid(){
    if(this.userName==''){
      this.userName=null;
    }
    if(this.userMobile==''){
      this.userMobile=null;
    }
  }
  allSelect(){
    this.all_select = !this.all_select;
    if(this.all_select){
      for(let i=0;i<this.userManageList.length;i++){
        this.userManageList[i].selected = true;
      }
    }else{
      for(let i=0;i<this.userManageList.length;i++){
        this.userManageList[i].selected = !this.userManageList[i].selected;
      }
    }
  }
  delete(){
    this.deleteShow = true;
    this.tip_title = '删除用户';
    this.tip_content = '是否删除所选用户？'
    let userId = '';
    for (let i = 0 ; i < this.userManageList.length ; i++) {
      if (this.userManageList[i].selected || this.all_select) {
        userId += this.userManageList[i].login + ',';
      }
    }
    this.loginId = userId.substring( 0 ,userId.length -1);
    //console.log(this.loginId);
  }
  deleteChange(event){
    this.deleteShow = event;
    this.valid();
    this.getAllUser(this.userName,this.userMobile,this.username,this.page,this.pageMaxItem);
  }
  check(index:number){
    if (this.all_select) {
      this.all_select = !this.all_select;
    }
    this.userManageList[index].selected = !this.userManageList[index].selected;
  }
  outTime(time){
    let temp = time.split('T');
    return temp[0]+' '+temp[1].substring(0,8);
  }
  search(){
    this.valid();
    this.getAllUser(this.userName,this.userMobile,this.username,this.page,this.pageMaxItem);
  }
  edit(item){
    this.createIndex=true;
    this.userInfo = item;
    this.userTitle = "修改用户";
  }
  create(){
    this.createIndex=true;
    this.userTitle = "新增用户";
  }
}
