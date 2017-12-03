import { Component,Input, Output,EventEmitter} from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
declare var $:any;

@Component({
  selector: 'delete-tips',
  templateUrl: './deleteTips.component.html',
  styleUrls: ['./deleteTips.component.css'],
  providers:[ElectricService]
})
export class DeleteTipsComponent {
  @Input() delete_towerIds:string;
  @Input() tip_content:string;
  @Output() deleteShowChange:EventEmitter<boolean> = new EventEmitter;
  show:boolean = false;
  constructor(private electricService:ElectricService) {

  }
  ngOnChanges(...args: any[]) {
    console.log(this.delete_towerIds);
  }
  delete(){
    this.electricService.deletePatrolTowers(this.delete_towerIds)
      .subscribe(result=>{
        this.cancel();
      })
  }
  cancel(){
    this.show = true;
    this.deleteShowChange.emit(this.show);
  }
}

