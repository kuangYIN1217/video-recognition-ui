import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'task-manage',
  styleUrls: ['./css/taskmanage.component.css'],
  templateUrl: './templates/taskmanage.html',
  providers: []
})
export class TaskManageComponent {
  alarmStatusArr:any[]=["全部","完成","进行中","未启动","暂停"];
  constructor() {

  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
}
