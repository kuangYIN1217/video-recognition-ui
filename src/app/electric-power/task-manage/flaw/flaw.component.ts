import { Component,Input, Output , EventEmitter} from '@angular/core';
@Component({
  selector: 'app-flaw',
  styleUrls: ['./flaw.component.css'],
  templateUrl: './flaw.component.html',
  providers: []
})
export class FlawComponent {
  @Input() title: string;
  @Input() flawArr:any[]=[];
  @Output() flawCheckedChange: EventEmitter<any> = new EventEmitter();
  flawChecked:any[]=[];
  constructor() {
  }
  ngOnChanges(...args: any[]) {
    this.flawChecked=[];
    for(let i=0;i<this.flawArr.length;i++){
      if(this.flawArr[i].flag==1){
        this.flawChecked.push(this.flawArr[i]);
      }
    }
  }
  check(item){
    if(!item.flag||item.flag==2){
      item.flag=1;
      this.flawChecked.push(item);
      this.flawCheckedChange.emit(this.flawChecked);
    }else{
      item.flag=2;
      for(let i=0;i<this.flawChecked.length;i++){
        if(item.flawId == this.flawChecked[i].flawId){
          this.flawChecked.splice(i, 1);
          this.flawCheckedChange.emit(this.flawChecked);
        }
      }
    }
  }
  stopPropagetion(e:any){
    var oev = e || event;
    oev.stopPropagation();
  }
  getSrc(item) {
    return ('../assets/alarmrlues/' + (item.flag == 1 ? 'checked.png' : 'unchecked.png'));
  }
}
