import { Component } from '@angular/core';
@Component({
  selector: 'alarm-rlues',
  styleUrls: ['./css/alarmrlues.component.css'],
  templateUrl: './templates/alarmrlues.html',
  providers: []
})
export class AlarmRluesComponent {
  sceneArr:any[]=[{"name":"嫌犯监控"}, {"name":"嫌疑车辆监控"}, {"name":"案犯追踪"}, {"name":"人贩锁定"}, {"name":"1号路口安全监控"}];
  constructor() {

  }
  check(item){
    if(!item.flag||item.flag==2){
      item.flag=1;
    }else{
      item.flag=2;
    }
  }
}
