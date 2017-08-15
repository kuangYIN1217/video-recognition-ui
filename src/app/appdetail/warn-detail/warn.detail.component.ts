import { Component, OnInit } from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
declare var $:any;
@Component({
  selector: 'warn-detail',
  templateUrl: './warn.detail.component.html',
  styleUrls: ['./warn.detail.component.css'],
  providers: [WarnService]
})
export class WarnDetailComponent{
  constructor(private warnService: WarnService) {

  }
}
