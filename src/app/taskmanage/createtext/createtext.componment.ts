import { Component } from '@angular/core';
@Component({
  selector: 'create-text',
  styleUrls: ['./css/createtext.component.css'],
  templateUrl: './templates/createtext.html',
  providers: []
})
export class CreateTextComponent {
  taskTitle:string="新建任务";
  constructor() {

  }
}
