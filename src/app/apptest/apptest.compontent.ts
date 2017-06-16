/**
 * Created by Administrator on 2017/6/15 0015.
 */
import { Component } from '@angular/core';
import {srs_init} from './srs'

@Component({
  selector: 'app-test',
  styleUrls: ['./css/apptest.component.css'],
  templateUrl: './templates/apptest.html'
})
export class AppTestComponent {

  ngOnInit() {
    // 初始化srs
    srs_init();
  }
}
