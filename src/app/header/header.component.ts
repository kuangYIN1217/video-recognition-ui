/**
 * Created by Administrator on 2017/6/20 0020.
 */
/**
 * Created by Administrator on 2017/6/20 0020.
 */
import { Component , Input} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../common/services/account.service";
declare var $:any;
@Component({
  selector: 'ng-header',
  styleUrls: ['./css/header.component.css'],
  templateUrl: './template/header.component.html',
  providers: [AccountService]
})
export class HeaderComponent {
  @Input() username: string = "";
  @Input() focusTab: number;
  systemAuthority:string;
  constructor(private router:Router,private accountService:AccountService) {

  }
  ngAfterContentChecked(){
    this.systemAuthority = localStorage.getItem('systemAuthority');
  }
  enterMenu(){
    $(".user-menuBox").css("display","block");
  }
  leaveMenu(){
    $(".user-menuBox").css("display","none");
  }
  logout() {
    localStorage.removeItem("authenticationToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("systemAuthority");
    this.router.navigate(['/login'])
  }
}
