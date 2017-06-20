/**
 * Created by Administrator on 2017/6/20 0020.
 */
/**
 * Created by Administrator on 2017/6/20 0020.
 */
import { Component , Input} from '@angular/core';
import {Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'ng-header',
  styleUrls: ['./css/header.component.css'],
  templateUrl: './template/header.component.html'
})
export class HeaderComponent {
  @Input() username: string = "";
  @Input() focusTab: number;
  constructor(private router:Router) {

  }
  logout() {
    sessionStorage.removeItem("authenticationToken");
    sessionStorage.removeItem("username");
    this.router.navigate(['/login'])
  }

}
