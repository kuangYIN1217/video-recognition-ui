import { Component } from '@angular/core';
import{ Router,ActivatedRoute } from '@angular/router'
import {calc_height} from "../../../common/ts/calc_height";
import {AccountService} from "../../../common/services/account.service";
declare var $:any;
@Component({
  selector: 'create-group',
  styleUrls: ['./createGroup.component.css'],
  templateUrl: './createGroup.component.html',
  providers: [AccountService]
})
export class CreateGroupComponent {
  groupName:string='';
  groupDescribe:string='';
  nameIndex:number=0;
  assignReal:any[]=[];
  assignOffline:any[]=[];
  assignArr:any[]=[];
  valueArr:any[]=[];
  groupObj:any={};
  editIndex:number=0;
  constructor(private route: ActivatedRoute,private router: Router,private accountService:AccountService) {
    this.route.queryParams.subscribe(params => {
      if(params["editIndex"]){
        this.editIndex = params["editIndex"];
      }
      if(this.editIndex==1){
        this.groupObj = JSON.parse(params["groupObj"]);
        console.log(this.groupObj);
        this.groupName = this.groupObj.groupName;
        this.groupDescribe = this.groupObj.detailedDescription;
      }else{
        if(JSON.stringify(params) != "{}") {
          this.groupName = params["groupName"];
          this.groupDescribe = params["groupDescribe"];
          if(JSON.parse(params["valueArr"]).length>0){
            this.valueArr = JSON.parse(params["valueArr"]);
          }
          if(JSON.parse(params["assignArr"]).length>0){
            this.assignArr = JSON.parse(params["assignArr"]);
          }
          if(JSON.parse(params["assignReal"]).length>0){
            this.assignReal = JSON.parse(params["assignReal"]);
          }
          if(JSON.parse(params["assignOffline"]).length>0){
            this.assignOffline = JSON.parse(params["assignOffline"]);
          }
        }
      }
      this.sureNext();
    });
  }
  ngOnChanges(...args: any[]) {

  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text("项目管理");
  }
  ngOnInit(){
    calc_height(document.getElementById('createContent'));

  }
  sureNext(){
    if(this.groupName.length>0){
      this.nameIndex = 1;
    }else{
      this.nameIndex = 0;
    }
  }
  next(){
    if(this.groupName==''){
      return false
    }else if(this.editIndex==1){
      this.groupObj.groupName = this.groupName;
      this.groupObj.detailedDescription = this.groupDescribe;
      this.accountService.updateGroups(this.groupObj)
        .subscribe(result=>{
          this.router.navigate(['/personalcenter/:groupmanage', {outlets: {aux: ['groupmanage']}}]);
        })
      //this.router.navigate(['/personalcenter/:creategroup2',{outlets:{aux: ['creategroup2']}}],{queryParams: {'groupName':this.groupName,'groupDescribe':this.groupDescribe,"groupObj":JSON.stringify(this.groupObj),"editIndex":this.editIndex}});
    }else if(this.editIndex==0){
      this.router.navigate(['/personalcenter/:creategroup2',{outlets:{aux: ['creategroup2']}}],{queryParams: {'groupName':this.groupName,'groupDescribe':this.groupDescribe,"valueArr":JSON.stringify(this.valueArr),"assignReal":JSON.stringify(this.assignReal),"assignOffline":JSON.stringify(this.assignOffline),"assignArr":JSON.stringify(this.assignArr),"editIndex":this.editIndex}});
    }
  }
}
