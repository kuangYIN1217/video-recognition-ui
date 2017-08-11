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
  @Output() deleteChange: EventEmitter<any> = new EventEmitter();
  constructor() {

  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }

  cancel(){
    this.deleteIndex = 2;
    this.deleteChange.emit(this.deleteIndex)
  }
}
