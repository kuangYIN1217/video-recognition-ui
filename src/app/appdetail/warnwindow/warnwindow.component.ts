import { Component,Input } from '@angular/core';
declare var $:any;
@Component({
  selector: 'warn-window',
  templateUrl: './warnwindow.component.html',
  styleUrls: ['./warnwindow.component.css']
})
export class WarnWindowComponent{
  allFlag:boolean=false;
  channelInfo:any[]=[];
  radioIndex:number;
  @Input() warn_title:string;
  constructor() {

  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
  radio(i){
    this.radioIndex = i;
  }
  back(){

  }
}
