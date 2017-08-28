import { Component,Input, Output , EventEmitter} from '@angular/core';
@Component({
  selector: 'alarm-rlues',
  styleUrls: ['./css/alarmrlues.component.css'],
  templateUrl: './templates/alarmrlues.html',
  providers: []
})
export class AlarmRluesComponent {
  @Input() width: string = '';
  @Input() margin: string = '';
  @Input() paddingRight: string = '';
  @Input() warnChanArr: any []=[];
  @Input() warnChanChecked: any []=[];
  @Output() chanChange: EventEmitter<any> = new EventEmitter();
  @Output() chanChangeId: EventEmitter<any> = new EventEmitter();
  warnChan:any[]=[];
  warnChanId:any[]=[];
  //appCate:string;
  constructor() {
    //this.appCate = window.sessionStorage.getItem("applicationType");
  }
  ngOnChanges(...args: any[]) {
    console.log(this.warnChanChecked);
/*    for(let i=0;i<this.warnChanChecked.length;i++){
      if(this.warnChanChecked){
        this.warnChanChecked[i].flag=2;
      }
    }*/
  }
  check(item){
    if(!item.flag||item.flag==2){
      item.flag=1;
      if(item.channelName){
        this.warnChan.push(item.channelName);
        this.warnChanId.push(item.channelId);
        this.chanChange.emit(this.warnChan);
        this.chanChangeId.emit(this.warnChanId);
      }else{
        this.warnChan.push(item.ruleName);
        this.warnChanId.push(item.ruleId);
        this.chanChange.emit(this.warnChan);
        this.chanChangeId.emit(this.warnChanId);
      }
    }else{
      item.flag=2;
      for(let i=0;i<this.warnChan.length;i++){
        if(item.channelName) {
          if (this.warnChan[i] == item.channelName) {
            this.warnChan.splice(i, 1);
            this.warnChanId.splice(i, 1);
            this.chanChange.emit(this.warnChan);
            this.chanChangeId.emit(this.warnChanId);
          }
        }else{
          if (this.warnChan[i] == item.ruleName) {
            this.warnChan.splice(i, 1);
            this.warnChanId.splice(i, 1);
            this.chanChange.emit(this.warnChan);
            this.chanChangeId.emit(this.warnChanId);
          }
        }
      }
    }
  }
  stopPropagetion(e){
    var oev = e || event;
    oev.stopPropagation();
  }
  getSrc(item) {
    return ('../assets/alarmrlues/' + (item.flag == 1 ? 'checked.png' : 'unchecked.png'));
  }
}
