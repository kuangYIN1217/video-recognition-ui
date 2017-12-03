import { Component,Input, Output,EventEmitter} from '@angular/core';
import {AccountService} from "../../common/services/account.service";
declare var $:any;
@Component({
  selector: 'delete-tip',
  templateUrl: './deleteTip.component.html',
  styleUrls: ['./deleteTip.component.css'],
  providers:[AccountService]
})
export class DeleteTipComponent{
  @Input() tip_title:string;
  @Input() tip_content:string;
  @Input() loginId:string;
  @Input() groupId:string;
  @Output() deleteChange: EventEmitter<any> = new EventEmitter();
  deleteShow:boolean;
  constructor(private accountService:AccountService) {

  }
  delete(){
    if(this.tip_title=='删除用户'){
      this.accountService.deleteUser(this.loginId)
        .subscribe(result=>{
          this.cancel();
        })
    }else if(this.tip_title=='删除群组'){
      this.accountService.deleteGroup(this.groupId)
        .subscribe(result=>{
          this.cancel();
        })
    }
  }
  cancel(){
    this.deleteShow = false;
    this.deleteChange.emit(this.deleteShow);
  }
}
