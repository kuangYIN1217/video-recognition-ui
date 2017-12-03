import { Component } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import {calc_height} from "../../../common/ts/calc_height";
import {AccountService} from "../../../common/services/account.service";
declare var $:any;
@Component({
  selector: 'create-group2',
  styleUrls: ['./createGroup2.component.css'],
  templateUrl: './createGroup2.component.html',
  providers: [AccountService]
})

export class CreateGroup2Component {
  groupName:string='';
  group:string='';
  groupDescribe:string='';
  checked:number=0;
  title:string='已选项目';
  required:number=0;
  username:string;
  projectArr:any[]=[];
  seeProject:any[]=[];
  permissions:any[]=[];
  applicationIdArr:any[]=[];
  all_select:boolean;
  projectAuthorityIdArr:any[]=[];
  groupObj:any={};
  groupArr:any[]=[];
  assignArr:any[]=[{"id":1,"name":"地图总览","projectAuthorityId":19,"all":[]},{"id":2,"name":"数据管理","all":[{"name":"全部权限","projectAuthorityId":20},{"name":"数据查看","projectAuthorityId":21}]},{"id":3,"name":"任务管理","all":[{"name":"全部权限","projectAuthorityId":22},{"name":"任务查看","projectAuthorityId":23}]},{"id":4,"name":"数据统计","all":[],"projectAuthorityId":25}];
  assignReal:any[]=[{"id":1,"name":"实时分析","all":[{"name":"全部权限","projectAuthorityId":2},{"name":"实时查看","projectAuthorityId":3}]},{"id":2,"name":"通道管理","all":[{"name":"全部权限","projectAuthorityId":4},{"name":"通道查看","projectAuthorityId":5}]},{"id":3,"name":"告警列表","all":[{"name":"全部权限","projectAuthorityId":6},{"name":"告警查看","projectAuthorityId":7}]},{"id":4,"name":"告警规则","all":[{"name":"全部权限","projectAuthorityId":8},{"name":"告警查看","projectAuthorityId":9}]}];
  assignOffline:any[]=[{"id":1,"name":"任务管理","all":[{"name":"全部权限","projectAuthorityId":11},{"name":"数据查看","projectAuthorityId":12}]},{"id":2,"name":"告警列表","all":[{"name":"全部权限","projectAuthorityId":13},{"name":"告警查看","projectAuthorityId":14}]},{"id":3,"name":"告警规则","all":[{"name":"全部权限","projectAuthorityId":15},{"name":"告警查看","projectAuthorityId":16}]}];
  assignIndex:number=0;
  valueArr:any[]=[];
  editIndex:number;
  projectIndex:number=0;
  permissionsArr:any[]=[];
  constructor(private route: ActivatedRoute,private router: Router,private accountService:AccountService) {
    this.username = sessionStorage.getItem("username");
    this.accountService.getUserInfo(this.username)
      .subscribe(result=>{
        console.log(result);
        for(let i=0;i<result.groups.length;i++){
          if(result.groups[i].systemAuthority==true){
            this.projectArr.push(result.groups[i]);
          }
        };
          this.getDate(this.projectArr);
      });
  }
  getDate(arr){
    console.log(arr);
    this.seeProject=[];
    this.permissions=[];
    for(let j=0;j<arr.length;j++){
      for(let i=0;i<arr[j].applications.length;i++){
        let obj:any={};
        obj.applicationName = arr[j].applications[i].applicationName;
        obj.applicationId = arr[j].applications[i].applicationId;
        this.seeProject.push(obj);
      }
    }
    if(JSON.stringify(this.groupObj)!="{}"){
      for(let i=0;i<this.groupObj.applications.length;i++){
        for(let j=0;j<this.seeProject.length;j++){
          if(this.groupObj.applications[i].applicationName==this.seeProject[j].applicationName){
            this.seeProject[j].flag = 1;
          }
        }
      }
      console.log(this.seeProject);
    }
    for(let j=0;j<arr.length;j++){
      for(let i=0;i<arr[j].projectAuthoritys.length;i++){
        let obj:any={};
        let arr1:any[]=[];
        obj.name = arr[j].projectAuthoritys[i].project;
        if(i==0){
          this.permissions.push(obj);
          arr1.push(obj.name);
        }else if(i>0&&(arr1.indexOf(arr[j].projectAuthoritys[i].project)==-1)){
          this.permissions.push(obj);
          arr1.push(obj.name);
        }
        this.permissionsArr.push(arr[j].projectAuthoritys[i]);
      }
    }
    this.permissions[0].selected = true;
    this.choose_project(this.permissions[0].name);
  }
  select_all(){
    this.all_select = !this.all_select;
    if(this.assignIndex==1){
      this.select_all_per(this.assignReal);
    }else if(this.assignIndex==2){
      this.select_all_per(this.assignOffline);
    }else if(this.assignIndex==3){
      this.select_all_per(this.assignArr);
    }
  }
  select_all_per(arr){
    if(this.all_select){
      for(let i=0;i<arr.length;i++){
        arr[i].selected = true;
        for(let j=0;j<arr[i].all.length;j++){
          arr[i].all[0].selected = true;
          arr[i].all[1].selected = false;
        }
      }
    }else{
      for(let i=0;i<arr.length;i++){
        arr[i].selected = false;
        for(let j=0;j<arr[i].all.length;j++){
          arr[i].all[j].selected = false;
        }
      }
    }
  }
  select_toggle(index){
    if(this.assignIndex==1){
      this.select_togglr_per(this.assignReal,index);
    }else if(this.assignIndex==2){
      this.select_togglr_per(this.assignOffline,index);
    }else if(this.assignIndex==3){
      this.select_togglr_per(this.assignArr,index);
    }
  }
  select_togglr_per(arr,index){
    for(let i=0;i<arr[index].all.length;i++){
      if(arr[index].all[i].selected){
        return;
      }
    }
    arr[index].selected = !arr[index].selected;
    if (this.all_select) {
      this.all_select = !this.all_select;
    }
  }
  radio_toggle(item,index){
    if(this.assignIndex==1){
      this.radio_toggle_per(this.assignReal,item,index);
    }else if(this.assignIndex==2){
      this.radio_toggle_per(this.assignOffline,item,index);
    }else if(this.assignIndex==3){
      this.radio_toggle_per(this.assignArr,item,index);
    }
  }
  radio_toggle_per(arr,item,index){
    if(!item.selected){
      for(let j=0;j<arr[index].all.length;j++){
        arr[index].all[j].selected = false;
      }
      item.selected = true;
      arr[index].selected = true;
    }
  }
  ngOnInit(){
    calc_height(document.getElementById('createContent2'));
    this.route.queryParams.subscribe(params => {
      if(params["editIndex"]){
        this.editIndex = params["editIndex"];
      }
      if(this.editIndex==1){
        this.groupObj = JSON.parse(params["groupObj"]);
        console.log(this.groupObj);
        this.seeProject=[];
        this.permissions=[];
        this.groupChange(this.groupObj.applications);
        this.groupArr.push(this.groupObj);
        this.getDate(this.groupArr);
        this.setauthories(this.groupObj.projectAuthoritys);
        this.group = this.groupObj.groupName;
        this.groupDescribe = this.groupObj.detailedDescription;
        console.log(this.seeProject);

      }else if(this.editIndex==0){
        if (JSON.stringify(params) != "{}") {
          this.group = params["groupName"];
          this.groupDescribe = params["groupDescribe"];
          if (JSON.parse(params["valueArr"]).length > 0) {
            this.valueArr = JSON.parse(params["valueArr"]);
            this.groupChange(this.valueArr);
          }
          if (JSON.parse(params["assignArr"]).length > 0) {
            this.assignArr = JSON.parse(params["assignArr"]);
          }
          if (JSON.parse(params["assignReal"]).length > 0) {
            this.assignReal = JSON.parse(params["assignReal"]);
          }
          if (JSON.parse(params["assignOffline"]).length > 0) {
            this.assignOffline = JSON.parse(params["assignOffline"]);
          }
        }
      }
    });
  }
  ngOnChanges(...args: any[]) {

  }
  setauthories(arr){
    for(let i=0;i<arr.length;i++){
      console.log(arr[i].project);
      if(arr[i].project == "实时流分析"){
        for(let j=0;j<this.assignReal.length;j++){
          for(let k=0;k<this.assignReal[j].all.length;k++){
            if(this.assignReal[j].all[k].projectAuthorityId==arr[i].projectAuthorityId){
              this.assignReal[j].all[k].selected = true;
              this.assignReal[j].selected = true;
            }
          }
        }
      }else if(arr[i].project == "离线文件分析"){
        for(let j=0;j<this.assignOffline.length;j++){
          //if(this.assignOffline[j].selected){
          for(let k=0;k<this.assignOffline[j].all.length;k++){
              if(this.assignOffline[j].all[k].projectAuthorityId==arr[i].projectAuthorityId){
                this.assignOffline[j].all[k].selected = true;
                this.assignOffline[j].selected = true;
              }
          }
        }
      }else if(arr[i].project == "电力巡检分析"){
        for(let j=0;j<this.assignArr.length;j++){
          if(this.assignReal[j].id==1||this.assignReal[j].id==4){
           if(arr[i].projectAuthorityId==this.assignReal[j].projectAuthorityId){
             this.assignReal[j].selected = true;
           }
          }else{
            for(let k=0;k<this.assignArr[j].all.length;k++){
              if(this.assignArr[j].all[k].projectAuthorityId==arr[i].projectAuthorityId){
                this.assignArr[j].all[k].selected = true;
                this.assignArr[j].selected = true;
              }
            }
          }
        }
      }
    }
  }
  setPermissions(arr){
    for(let i=0;i<arr.length;i++){
      console.log(arr[i].project);
      if(arr[i].project == "实时流分析"){
        for(let j=0;j<this.assignReal.length;j++){
          //if(this.assignReal[j].selected){
          for(let k=0;k<this.assignReal[j].all.length;k++){
            if(this.assignReal[j].all[k].selected){
              let real:any={};
              real.projectAuthorityId = this.assignReal[j].all[k].projectAuthorityId;
              this.projectAuthorityIdArr.push(real);
            }
            //}
          }
        }
      }else if(arr[i].project == "离线文件分析"){
        for(let j=0;j<this.assignOffline.length;j++){
          for(let k=0;k<this.assignOffline[j].all.length;k++){
            if(this.assignOffline[j].all[k].selected){
              let offline:any={};
              offline.projectAuthorityId =this.assignOffline[j].all[k].projectAuthorityId;
              this.projectAuthorityIdArr.push(offline);
            }
          }
        }
      }else if(arr[i].project == "电力巡检分析"){
        for(let j=0;j<this.assignArr.length;j++){
          if(this.assignArr[j].selected&&(this.assignReal[j].id==1||this.assignReal[j].id==4)){
            let ele:any={};
            ele.projectAuthorityId = this.assignReal[j].projectAuthorityId;
            this.projectAuthorityIdArr.push(ele);
          }else{
            for(let k=0;k<this.assignArr[j].all.length;k++){
              if(this.assignArr[j].all[k].selected){
                let ele:any={};
                ele.projectAuthorityId = this.assignReal[j].projectAuthorityId;
                this.projectAuthorityIdArr.push(this.assignOffline[j].all[k].projectAuthorityId);
              }
            }
          }
        }
      }
    }
  }
  create(){
    this.projectAuthorityIdArr = [];
    this.setPermissions(this.permissionsArr);
   // console.log(this.projectAuthorityIdArr);
    this.groupObj.groupName=this.group;
    this.groupObj.detailedDescription = this.groupDescribe;
    this.groupObj.applications = this.applicationIdArr;
    this.groupObj.projectAuthoritys = this.projectAuthorityIdArr;
    //console.log(this.groupObj);
    this.accountService.createGroups(this.groupObj)
      .subscribe(result=>{
        console.log(result);
        this.router.navigate(['/personalcenter/:groupmanage', {outlets: {aux: ['groupmanage']}}]);
      })
  }
  save(){
    this.projectAuthorityIdArr = [];
    this.setPermissions(this.permissionsArr);
    // console.log(this.projectAuthorityIdArr);
    this.groupObj.applications = this.applicationIdArr;
    this.groupObj.projectAuthoritys = this.projectAuthorityIdArr;
    //console.log(this.groupObj);
    this.accountService.updateGroups(this.groupObj)
      .subscribe(result=>{
        this.router.navigate(['/personalcenter/:groupmanage', {outlets: {aux: ['groupmanage']}}]);
      })
  }
  checkedProject(e:any){
    console.log(this.seeProject);
    this.checked=1;
    let oev = e || event;
    oev.preventDefault();
    oev.stopPropagation();
    return false;
  }
  checkRadio(item){
    if(!item.selected){
      for(let i=0;i<this.permissions.length;i++){
        if(this.permissions[i].selected){
          this.permissions[i].selected = !this.permissions[i].selected;
        }
      }
      item.selected = true;
    }
      this.choose_project(item.name);
    }
  choose_project(item){
    if(item=='实时流分析'){
      this.assignIndex =1;
    }else if(item=='离线文件分析'){
      this.assignIndex =2;
    }else if(item=='电力巡检分析'){
      this.assignIndex =3;
    }
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text("项目管理");
  }
  groupChange(event){
    console.log(event);
    this.valueArr = event;
    let project = '';
    for(let i=0;i<event.length;i++){
      project+=event[i].applicationName+',';
      let obj:any={};
      obj.applicationId = event[i].applicationId;
      this.applicationIdArr.push(obj);
    }
    this.groupName = project.substring(0,project.length-1);
  }
  hide(){
    this.checked = 0;
  }
  prev(){
    this.router.navigate(['/personalcenter/:creategroup', {outlets: {aux: ['creategroup']}}],{queryParams: {'groupName':this.group,"groupDescribe":this.groupDescribe,"valueArr":JSON.stringify(this.valueArr),"assignReal":JSON.stringify(this.assignReal),"assignOffline":JSON.stringify(this.assignOffline),"assignArr":JSON.stringify(this.assignArr)}});
  }
  cancel(){
    this.router.navigate(['/personalcenter/:groupmanage', {outlets: {aux: ['groupmanage']}}]);
  }
}
