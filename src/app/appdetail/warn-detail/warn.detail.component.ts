import { Component, OnInit } from '@angular/core';
import {WarnService} from "../../common/services/warn.service";
import {Page} from "app/common/defs/resources";
import {ActivatedRoute, Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'warn-detail',
  templateUrl: './warn.detail.component.html',
  styleUrls: ['./warn.detail.component.css'],
  providers: [WarnService]
})
export class WarnDetailComponent{
  detailList:any={};
  constructor(private warnService: WarnService,private router:Router,private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.detailList = params['detailList'];
    });
  }
}
