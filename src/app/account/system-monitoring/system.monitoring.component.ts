import { Component } from '@angular/core';
import {Page} from "app/common/defs/resources";
import {AccountService} from "../../common/services/account.service";
import {calc_height} from "app/common/ts/calc_height";
declare var $:any;
@Component({
  selector: 'system-monitoring',
  styleUrls: ['./system.monitoring.component.css'],
  templateUrl: './system.monitoring.html',
  providers: [AccountService]
})

export class SystemMonitoringComponent {
  username:string;
  page:number=0;
  pageMaxItem:number=10;
  pageParams = new Page();
  userName:string='';
  startTime:string;
  endTime:string;
  monitoringArr:any[]=[];
  constructor(private accountService:AccountService) {
    this.username = sessionStorage.getItem('username');
    this.getMonitoring(this.username,null,null,null,this.page,this.pageMaxItem);
  }
  ngOnInit() {
    calc_height(document.getElementById('monitoring'));
    $("#userStart").jeDate({
      isinitVal:true,
      festival: false,
      format: 'YYYY-MM-DD hh:mm:ss',
    });
    $("#userEnd").jeDate({
      isinitVal:true,
      festival: false,
      format: 'YYYY-MM-DD hh:mm:ss'
    });

    this.startTime = $('#userStart').val("");
    this.endTime = $('#userEnd').val("");
  }
  outTime(time){
    let temp = time.split('T');
    return temp[0]+' '+temp[1].substring(0,8);
  }
  search(){
    this.valid();
    this.getMonitoring(this.username,this.userName,this.startTime,this.endTime,this.page,this.pageMaxItem);
  }
  valid(){
    if(this.userName==''){
      this.userName = null;
    }
    this.startTime = $('#userStart').val();
    this.endTime = $('#userEnd').val();
    if(this.startTime==''){
      this.startTime = null;
    }
    if(this.endTime==''){
      this.endTime = null;
    }
  }
  getPageData(paraParam) {
    this.valid();
    this.getMonitoring(this.username,this.userName,this.startTime,this.endTime,paraParam.curPage-1,paraParam.pageMaxItem);
  }
  getMonitoring(creator,login,startTime,endTime,page,size){
    this.accountService.getMonitorinmg(creator,login,startTime,endTime,page,size)
      .subscribe(result=>{
          this.monitoringArr = result.content;
          let page = new Page();
          page.pageMaxItem = result.size;
          page.curPage = result.number+1;
          page.totalPage = result.totalPages;
          page.totalNum = result.totalElements;
          this.pageParams = page;
      })
  }
}
