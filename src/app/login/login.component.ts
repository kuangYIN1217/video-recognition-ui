import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../common/services/resources.service'
import { UserService } from '../common/services/user.service'
import {Router} from "@angular/router";
import {AccountService} from "../common/services/account.service";

declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'login',
    styleUrls: ['./css/login.component.css'],
    templateUrl: './templates/login.html',
    providers: [ResourcesService,UserService,AccountService]
})
export class LoginComponent implements OnInit{
    validCode: string = "";
    digit:number =6;
    username: string = "";
    msg_header = "";
    msg_content = "";
    msg_show = false;
    tabIndex:number=0;
    hg:any;
    constructor(private accountService: AccountService,private resourcesService: ResourcesService, private userService: UserService,private router: Router){
        if((!localStorage['authenticationToken'])||localStorage['authenticationToken']==""){
            // this.logined = 0;
            // console.log(sessionStorage['authenticationToken']);
        }else{
            let token = localStorage['authenticationToken'];
            // modal for going to overview
            // userService.getAccount().subscribe(account => console.log(account));
            // console.log(userService.getAccount());
            //console.log("already logined : ");
            //console.log(token);
          this.router.navigate(['/appmanage'])
            // window.location.href = "/#/overview";
        }
    }
    ngOnInit(){
        $('#b03').unslider({
            dots: true,
        });
        // this.changeValidCode();
    }
    clickBtn(){
        if(this.tabIndex==0){
            this.tabIndex=1;
        }
        else{
            this.tabIndex=0;
        }
    }
    changeValidCode(){
      //    $("#code").empty();
      //    this.validCode = this.getNewValidCode();
      //    var checkCode = document.getElementById('code');
      //    if (checkCode)
      //    {
      //       checkCode.className = "code";
      //    }
      //    var context = checkCode.getContext('2d');
      //    context.clearRect(0,0,checkCode.width,checkCode.height);
      //    context.fillStyle = '#000';
      //   // 设置文字属性
      //    context.font = 'bold italic 70px sans-serif';
      //    context.textBaseline = 'top';
      //    // 填充字符串
      // context.fillText(this.validCode,2,33);
     }

    getNewValidCode(): string{
        let result: string = "";
        for (let j=1;j<=this.digit;j++){
            let i = Math.floor(Math.random() * 1e6);
            if(this.ifCharacter()){
                let temp = i%26+65;
                if (this.ifCharacter()){
                    temp = temp + 32;
                }
                let charc = String.fromCharCode(temp);
                result = result +charc;
            }else{
                let temp = i%10+48;
                let charc = String.fromCharCode(temp);
                result = result +charc;
            }
        }
        //console.log(result);
        return result;
    }

    ifCharacter(){
        return Math.floor(Math.random() * 1e6)%2==0;
    }

    login(){
        var username = $('#username').val();
        var pwd = $('#password').val();
        var valid = $('#surePwd').val();
        // console.log(valid);
        // if (valid!=this.validCode){
        //     this.showMessage("验证码错误");
        //     $('surePwd').value="";
        //     this.changeValidCode();
        // }else{
            // let token: string = "";
            let result = this.userService.authorize(username, pwd)
            .subscribe(returnToken => this.validToken(returnToken,username,pwd));
        // }
    }
    validToken(returnToken,username,pwd){
        //console.log(returnToken);
        if(returnToken=="fail"){
            this.showMessage("登陆失败");
        }else if(returnToken&&returnToken.id_token){
          localStorage['authenticationToken'] = returnToken.id_token;
          localStorage['username']= username;
          localStorage.setItem("username" , username);
          localStorage.setItem("password" , pwd);
          this.accountService.getUserInfo(username)
            .subscribe(result=>{
              localStorage.setItem("userId" , result.id);
              this.accountService.getAllAuthories(username)
                .subscribe(result=>{
                  console.log("登陆成功");
                  // this.showMessage("登陆成功");
                  this.router.navigate(['/appmanage'])
              });
            });

/*            console.log(sessionStorage['username']);
            console.log(sessionStorage['authenticationToken']);*/

          // window.location.href = "/overview";
        }
    }

    showMessage(message: string){
        this.msg_show = true;
        this.msg_header = "登陆提示";
        this.msg_content = message;
    }
    hideMessageBox(){
        this.msg_show = false;
        if (this.msg_content=="登陆成功"){
          this.router.navigate(['/appmanage'])

          // window.location.href = "/overview";
        }
    }
}
