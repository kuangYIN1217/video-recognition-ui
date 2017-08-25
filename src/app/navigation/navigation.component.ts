import {Component} from "@angular/core";
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {ResourcesService} from "../common/services/resources.service";
import {SceneService} from "../common/services/scene.service";
import {SceneInfo} from "../common/defs/resources";
import {Router} from "@angular/router";

@Component({
  selector: 'navigation',
  styleUrls: ['./css/navigation.component.css'],
  templateUrl: './templates/navigation.html',
  providers: [ResourcesService, SceneService],
})
export class NavigationComponent {
  // needhide = 0;
  focusTab: number;
  collapse: number = 0;
  sceneArray: SceneInfo[] = [];
  focusCollapse: string = "0";
  username: string = "";
  online: boolean = true;
  // location: Location;

  changeCollapse() {
    this.collapse = 1 - this.collapse;
  }

  changeTab(nextFocus: number) {
    this.focusTab = nextFocus;
  }

  constructor(private location: Location,private router:Router) {
    if (!sessionStorage['username']) {
      this.focusTab = 0;
      this.router.navigate(['/login'])
    }
  }
  //response
  response(data){
    console.log(data)
  }

  ngAfterContentChecked(){
    // this.location = location;
    // console.log("navigation initial");
    if (!this.location.isCurrentPathEqualTo('/login')) {
      // sceneService.getAllScenes()
      //     .subscribe(sceneArray => this.sceneArray = sceneArray);
    }
    if (sessionStorage['username']) {
      this.username = sessionStorage['username'];
    } else {
      this.username = "Loading";
    }

    if (sessionStorage['applicationType'] === '离线文件分析') {
      this.online = false;
    } else {
      this.online = true;
    }
    if (this.location.isCurrentPathEqualTo('/login') || this.location.isCurrentPathEqualTo('') ) {
      this.focusTab = 0;
      // this.needhide = 0;
    } else if(this.location.isCurrentPathEqualTo('/appmanage')) {
      // 仅显示顶部
      this.focusTab = -1;
    } else if (this.location.isCurrentPathEqualTo('/videoanalysis')) {
      this.focusTab = 1;
      // this.needhide = 0;
    } else if (this.location.path().match(/\/waymanage/)) {
      this.focusTab = 2;
      // this.needhide = 0;　
    } else if (this.location.isCurrentPathEqualTo('/monitorreport') ) {
      this.focusTab = 3;
      // this.needhide = 0;
    } else if (this.location.isCurrentPathEqualTo('/technologysupport') ) {
      this.focusTab = 4;
      // this.needhide = 0;
    }else if (this.location.isCurrentPathEqualTo('/taskmanage')||this.location.path().match(/\/createtext/)){
      this.focusTab = 5;
      // this.needhide = 0;
    }else if (this.location.isCurrentPathEqualTo('/warnmanage')||this.location.isCurrentPathEqualTo('/warnrlue')){
      this.focusTab = 6;
      // this.needhide = 0;
    }
  }

  logout() {
    sessionStorage.removeItem("authenticationToken");
    sessionStorage.removeItem("username");
    this.router.navigate(['/login'])

    // window.location.href = "/login";
  }
  gotoAppmanage () {
    this.router.navigate(['/appmanage'])
  }
}
