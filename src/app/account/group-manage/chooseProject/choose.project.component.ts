import { Component,Input, Output , EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../../../common/services/account.service";
@Component({
  selector: 'choose-project',
  styleUrls: ['./choose.project.component.css'],
  templateUrl: './choose.project.component.html',
  providers: [AccountService]
})

export class ChooseProjectComponent {
  groupNameArr:any[]=[];
  @Input() seeProject:any[]=[];
  @Input() valueArr:any[]=[];
  @Input() groupName:string;
  @Output() groupChange: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router,private accountService:AccountService) {
  }
  ngOnChanges(...args: any[]) {
    this.groupNameArr = [];
    console.log(this.seeProject);
    for(let i=0;i<this.seeProject.length;i++){
      if(this.seeProject[i].flag==1){
        this.groupNameArr.push(this.seeProject[i]);
      }
    }
  }
  check(item){
    if(!item.flag||item.flag==2){
      item.flag=1;
      this.groupNameArr.push(item);
      this.groupChange.emit(this.groupNameArr);
    }else{
      item.flag=2;
      for(let i=0;i<this.groupNameArr.length;i++){
        if(this.groupNameArr[i].applicationName == item.applicationName){
          this.groupNameArr.splice(i, 1);
          this.groupChange.emit(this.groupNameArr);
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
