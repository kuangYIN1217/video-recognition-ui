import { Component,Input,Output,EventEmitter} from '@angular/core';
import {AppManageService} from "../common/services/appmanage.service";

@Component({
  selector: 'create-project',
  styleUrls: ['./createProject.component.css'],
  templateUrl: './createProject.component.html',
  providers: [AppManageService]
})

export class CreateProjectComponent {
  projectName:string='';
  projectCates:any[]=[];
  projectCate:string;
  @Input()newProject:boolean;
  required:number=0;
  userId:string;
  @Output() newProjectChange: EventEmitter<any> = new EventEmitter();
  constructor(private appManageService: AppManageService){
    this.userId = sessionStorage.getItem('userId');
    this.appManageService.getCategory()
      .subscribe(result=>{
        this.projectCates=result;
        this.projectCate = this.projectCates[0];
      });
  }
  create(){
    if(this.projectName==''){
      this.required = 1;
      return false;
    }else{
      this.required = 0;
    }
    this.appManageService.createApplication(this.projectName,this.projectCate,this.userId)
      .subscribe(result=>{
        this.back();
      })
  }
  back(){
    this.newProject = false;
    this.newProjectChange.emit(this.newProject);
  }
}
