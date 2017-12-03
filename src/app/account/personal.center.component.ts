import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'personal-center',
  styleUrls: ['./personal.center.component.css'],
  templateUrl: './personal.center.html',
  providers: []
})

export class PersonalCenterComponent {
  personalTab: number;
  status:string;
  modelName:string;
  constructor(private location: Location,private router:Router,private route: ActivatedRoute) {

  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.status = params['status'];
      //console.log(this.status);
      if(this.status==":accountmanage"){
        this.modelName="账号管理";
        this.personalTab = 1;
      }else if(this.status==":accessmanage"){
        this.modelName="访问管理";
        this.personalTab = 3;
      }else if(this.status==":systemmonitoring"){
        this.modelName="系统监控";
        this.personalTab = 5;
      }
    });
  }
  changeTab(nextFocus: number) {
    this.personalTab = nextFocus;
  }
  ngAfterContentChecked(){
    if(this.location.isCurrentPathEqualTo('/personalcenter/:accountmanage')) {
      // 仅显示顶部
      this.personalTab = 1;
    }else if (this.location.isCurrentPathEqualTo('/personalcenter/:accountmanage')) {
      this.personalTab = 2;
    }else if (this.location.isCurrentPathEqualTo('/personalcenter/:accessmanage')) {
      this.personalTab = 3;
    }
    else if (this.location.isCurrentPathEqualTo('/personalcenter/:groupmanage')||this.location.path().match(/\/personalcenter\/creategroup/)) {
      this.personalTab = 4;
    }
    else if (this.location.isCurrentPathEqualTo('/personalcenter/:systemmonitoring')) {
      this.personalTab = 5;
    }
  }
  gotoAppmanage () {
    this.router.navigate(['/appmanage'])
  }
}
