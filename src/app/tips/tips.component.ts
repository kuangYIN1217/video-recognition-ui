import { Component,Input, Output,EventEmitter} from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-tips',
  templateUrl: './templates/tips.html',
  styleUrls: ['./css/tips.component.css']
})
export class TipsComponent{
  @Input() tip_title:string;
  @Input() tip_content:string;
  @Input() deleteIndex:number;
  @Input() tip_btn:number;
  @Output() deleteChange: EventEmitter<any> = new EventEmitter();
  @Output() deletedChange: EventEmitter<any> = new EventEmitter();
  deleted:number=0;
  constructor() {

  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  delete(){
    this.deleteIndex = 2;
    this.deleted = 1;
    this.deleteChange.emit(this.deleteIndex);
    this.deletedChange.emit(this.deleted);
  }
  cancel(){
    this.deleteIndex = 2;
    this.deleteChange.emit(this.deleteIndex);
  }
}
