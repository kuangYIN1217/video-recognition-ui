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
  elector:boolean = true;
  // location: Location;
  systemAuthority:string;
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
    this.systemAuthority = sessionStorage.getItem('systemAuthority');
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
    if (sessionStorage['applicationType'] === '电力巡检分析') {
      this.elector = false;
    } else {
      this.elector = true;
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
    }else if (this.location.path().match(/\/taskmanage/)||this.location.path().match(/\/createtext/)){
      this.focusTab = 5;
      // this.needhide = 0;
    }else if (this.location.path().match(/\/warnmanage/)||this.location.path().match(/\/warnrlue/)||this.location.path().match(/\/warntime/)){
      this.focusTab = 6;
      // this.needhide = 0;
    }else if (this.location.isCurrentPathEqualTo('/overviewmap')||this.location.path().match(/\/overviewmap/) ) {
      this.focusTab = 7;
      // this.needhide = 0;
    }else if (this.location.path().match(/\/datamanage/)||this.location.path().match(/\/createinspection/)){
      this.focusTab = 8;
      // this.needhide = 0;
    }else if (this.location.path().match(/\/electaskmanage/)||this.location.path().match('/createtask')||this.location.path().match('/taskresult')||this.location.path().match('/editresult') ) {
      this.focusTab = 9;
      // this.needhide = 0;
    }else if (this.location.isCurrentPathEqualTo('/datastatistics') ) {
      this.focusTab = 10;
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
