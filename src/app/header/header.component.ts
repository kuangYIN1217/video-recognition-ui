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
    this.systemAuthority = sessionStorage.getItem('systemAuthority');
  }
  enterMenu(){
    $(".user-menuBox").css("display","block");
  }
  leaveMenu(){
    $(".user-menuBox").css("display","none");
  }
  logout() {
    sessionStorage.removeItem("authenticationToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("systemAuthority");
    this.router.navigate(['/login'])
  }
}
