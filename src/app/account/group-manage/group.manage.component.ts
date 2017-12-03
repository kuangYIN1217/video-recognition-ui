import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../../common/services/account.service";
import {Page} from "app/common/defs/resources";
import {calc_height} from "../../common/ts/calc_height";
declare var $:any;
@Component({
  selector: 'group-manage',
  styleUrls: ['./group.manage.component.css'],
  templateUrl: './group.manage.html',
  providers: [AccountService]
})

export class GroupManageComponent {
  groupName:string='';
  username:string;
  password:string;
  groupManageList:any[]=[];
  pageParams = new Page();
  page: number = 0;
  pageMaxItem: number = 10;
  pageNow:number;
  pageMax:string;
  all_select:boolean;
  deleteShow:boolean = false;
  tip_title:string='';
  tip_content:string='';
  groupId:string;
  constructor(private router: Router,private accountService:AccountService) {
    this.username = sessionStorage.getItem('username');
    this.getGroupList(this.username,null,this.page,this.pageMaxItem);
  }
  getGroupList(username,groupname,page,size){
    this.accountService.getAllGroups(username,groupname,page,size)
      .subscribe(result=>{
        this.groupManageList = result.content;
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
  output(item){
    let name = ''
    for(let i=0;i<item.length;i++){
      name+=item[i].authorityName+',';
    }
    return name.substring(0,name.length-1);
  }
  allSelect(){
    this.all_select = !this.all_select;
    if(this.all_select){
      for(let i=0;i<this.groupManageList.length;i++){
        this.groupManageList[i].selected = true;
      }
    }else{
      for(let i=0;i<this.groupManageList.length;i++){
        this.groupManageList[i].selected = !this.groupManageList[i].selected;
      }
    }
  }
  check(index:number){
    if (this.all_select) {
      this.all_select = !this.all_select;
    }
    this.groupManageList[index].selected = !this.groupManageList[index].selected;
  }
  delete(){
    this.deleteShow = true;
    this.tip_title = '删除群组';
    this.tip_content = '是否删除所选群组？'
    let groupId = '';
    for (let i = 0 ; i < this.groupManageList.length ; i++) {
      if (this.groupManageList[i].selected || this.all_select) {
        groupId += this.groupManageList[i].groupId + ',';
      }
    }
    this.groupId = groupId.substring( 0 ,groupId.length -1);
  }
  deleteChange(event){
    this.deleteShow = event;
    this.judgeGroupName();
    this.getGroupList(this.username,this.groupName,this.page,this.pageMaxItem);
  }
  getPageData(paraParam) {
    this.judgeGroupName();
    this.getGroupList(this.username,this.groupName,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  judgeGroupName(){
    if(this.groupName==''){
      this.groupName=null;
    }
  }
  search(){
    this.judgeGroupName();
    this.getGroupList(this.username,this.groupName,this.page,this.pageMaxItem);
  }
  outTime(time){
    let temp = time.split('T');
    return temp[0]+' '+temp[1].substring(0,8);
  }
  edit(item,index){
    console.log(item);
    this.router.navigate(['/personalcenter/:creategroup', {outlets: {aux: ['creategroup']}}],{queryParams: {'groupObj':JSON.stringify(item),"editIndex":index}});
  }
  permissions(item,index){
    console.log(item);
    this.router.navigate(['/personalcenter/:creategroup2', {outlets: {aux: ['creategroup2']}}],{queryParams: {'groupObj':JSON.stringify(item),"editIndex":index}});
  }
  create(){
    this.router.navigate(['/personalcenter/:creategroup', {outlets: {aux: ['creategroup']}}]);
  }
}
