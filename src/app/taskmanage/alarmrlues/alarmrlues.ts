import { Component,Input, Output , EventEmitter} from '@angular/core';
@Component({
  selector: 'alarm-rlues',
  styleUrls: ['./css/alarmrlues.component.css'],
  templateUrl: './templates/alarmrlues.html',
  providers: []
})
export class AlarmRluesComponent {
  @Input() title: string;
  @Input() warn_title:string;
  @Input() taskTitle:string;
  @Input() width: string = '';
  @Input() margin: string = '';
  @Input() paddingRight: string = '';
  @Input() warnChanArr: any []=[];
  @Input() warnChanChecked: any []=[];
  @Output() chanChange: EventEmitter<any> = new EventEmitter();
  @Output() chanChangeId: EventEmitter<any> = new EventEmitter();
  @Output() warnChanCheckedChange: EventEmitter<any> = new EventEmitter();
  warnChan:any[]=[];
  warnChanId:any[]=[];
  warnChanCheckedArr:any[]=[];
  bool:boolean=true;
  //appCate:string;
  otherArr:any[]=[];
  indexLabel:number=0;
  indexTarget:number=0;
  constructor() {
    //this.appCate = window.sessionStorage.getItem("applicationType");
  }
  ngOnChanges(...args: any[]) {
    //console.log(this.warnChanArr);
    if(this.warn_title=='新建规则'||this.taskTitle=='新建任务'){
      this.warnChan=[];
      this.warnChanId=[];
      for(let i=0;i<this.warnChanArr.length;i++){
        if(this.warnChanArr[i].flag==1){
          this.warnChanArr[i].flag=2;
        }
      }
    }else if(this.warn_title=='修改规则'||this.taskTitle=='修改任务'){
      this.warnChan=[];
      this.warnChanId=[];
      this.warnChanCheckedArr=[];
      //console.log(this.warnChanArr);
      //console.log(this.warnChanChecked);
      if(this.warnChanChecked.length>0){
        for(let i=0;i<this.warnChanChecked.length;i++){
          for(let j=0;j<this.warnChanArr.length;j++){
            if(this.warnChanArr[0].channelName){
              if(this.warnChanChecked[i].channelId == this.warnChanArr[j].channelId){
                this.warnChanArr[j].flag = 1;
                //if(this.bool == true){
                //this.bool = false;
                this.warnChan.push(this.warnChanArr[j].channelName);
                this.warnChanId.push(this.warnChanArr[j].channelId);
                this.warnChanCheckedArr.push(this.warnChanArr[j]);
                //}
              }
            }else{
              if(this.warnChanChecked[i].recognitionCategory.cateId==1||this.warnChanChecked[i].recognitionCategory.cateId==26){
                if(this.warnChanChecked[i].targetFeature==''||this.warnChanChecked[i].targetFeature==null){
                  if((this.warnChanArr[j].recognitionCategory.cateId==1||this.warnChanArr[j].recognitionCategory.cateId==26)&&(this.warnChanArr[j].targetFeature!=''&&this.warnChanArr[j].targetFeature!=null)){
                    this.warnChanArr[j].selected=1;
                  }
                }else if(this.warnChanChecked[i].targetFeature!=''&&this.warnChanChecked[i].targetFeature!=null){
                  if((this.warnChanArr[j].recognitionCategory.cateId==1||this.warnChanArr[j].recognitionCategory.cateId==26)&&(this.warnChanArr[j].targetFeature==''||this.warnChanArr[j].targetFeature==null)){
                    this.warnChanArr[j].selected=1;
                  }
                }
              }
              if(this.warnChanChecked[i].recognitionCategory.cateId==8||this.warnChanChecked[i].recognitionCategory.cateId==10||this.warnChanChecked[i].recognitionCategory.cateId==23||this.warnChanChecked[i].recognitionCategory.cateId==25||this.warnChanChecked[i].recognitionCategory.cateId==30){
                if(this.warnChanChecked[i].recognitionCategory.cateId==8||this.warnChanChecked[i].recognitionCategory.cateId==10||this.warnChanChecked[i].recognitionCategory.cateId==23||this.warnChanChecked[i].recognitionCategory.cateId==25){
                  if(this.warnChanArr[j].recognitionCategory.cateId==30){
                    this.warnChanArr[j].selected1=1;
                  }
                }else if(this.warnChanChecked[i].recognitionCategory.cateId==30){
                  if(this.warnChanArr[j].recognitionCategory.cateId==8||this.warnChanArr[j].recognitionCategory.cateId==10||this.warnChanArr[j].recognitionCategory.cateId==23||this.warnChanArr[j].recognitionCategory.cateId==25){
                    this.warnChanArr[j].selected1=1;
                  }
                }
              }
              //console.log(this.warnChanArr);
              if(this.warnChanChecked[i].ruleId == this.warnChanArr[j].ruleId){
                this.warnChanArr[j].flag = 1;
                //if(this.bool == true) {
                  //this.bool = false;
                  this.warnChan.push(this.warnChanArr[j].ruleName);
                  this.warnChanId.push(this.warnChanArr[j].ruleId);
                  this.warnChanCheckedArr.push(this.warnChanArr[j]);
                //}
              }
            }
          }
        }
        //console.log(this.warnChanCheckedArr);
        //console.log(this.warnChanArr)
        this.warnChanCheckedChange.emit(this.warnChanCheckedArr);
      }
    }
/*    for(let i=0;i<this.warnChanChecked.length;i++){
      if(this.warnChanChecked){
        this.warnChanChecked[i].flag=2;
      }
    }*/
  }
  check(item){
    //console.log(item);
    if(item.ruleName){
      if(item.selected==1){
        return false;
      }
      if(item.selected1==1){
        return false;
      }
      if(item.flag==1&&(item.recognitionCategory.cateId==1||item.recognitionCategory.cateId==26)){
        for(let i=0;i<this.warnChanArr.length;i++){
          if(((this.warnChanArr[i].recognitionCategory.cateId==1||this.warnChanArr[i].recognitionCategory.cateId==26)&&this.warnChanArr[i].flag==1)&&(this.warnChanArr[i].ruleId!=item.ruleId)){
            this.indexLabel = 1;
            break;
          }else{
            this.indexLabel = 0;
          }
        }
        if(this.indexLabel == 0){
          for(let i=0;i<this.warnChanArr.length;i++) {
            if (this.warnChanArr[i].recognitionCategory.cateId == 1 || this.warnChanArr[i].recognitionCategory.cateId == 26) {
              this.warnChanArr[i].selected = 2;
            }
          }
        }
        //console.log(this.warnChanArr);
      }else{
        if((item.recognitionCategory.cateId==1||item.recognitionCategory.cateId==26)&&(item.targetFeature==''||item.targetFeature==null)){
          for(let i=0;i<this.warnChanArr.length;i++){
            if((this.warnChanArr[i].recognitionCategory.cateId==1||this.warnChanArr[i].recognitionCategory.cateId==26)&&(this.warnChanArr[i].targetFeature!=''&&this.warnChanArr[i].targetFeature!=null)){
              this.warnChanArr[i].selected=1;
            }
          }
        }else if((item.recognitionCategory.cateId==1||item.recognitionCategory.cateId==26)&&(item.targetFeature!=''&&item.targetFeature!=null)){
          for(let i=0;i<this.warnChanArr.length;i++){
            if((this.warnChanArr[i].recognitionCategory.cateId==1||this.warnChanArr[i].recognitionCategory.cateId==26)&&(this.warnChanArr[i].targetFeature==''||this.warnChanArr[i].targetFeature==null)){
              this.warnChanArr[i].selected=1;
            }
          }
        }
      }
      if(item.flag==1&&(item.recognitionCategory.cateId==8||item.recognitionCategory.cateId==10||item.recognitionCategory.cateId==23||item.recognitionCategory.cateId==25||item.recognitionCategory.cateId==30)){
        for(let i=0;i<this.warnChanArr.length;i++){
          if(((this.warnChanArr[i].recognitionCategory.cateId==8||this.warnChanArr[i].recognitionCategory.cateId==10||this.warnChanArr[i].recognitionCategory.cateId==23||this.warnChanArr[i].recognitionCategory.cateId==25||this.warnChanArr[i].recognitionCategory.cateId==30)&&this.warnChanArr[i].flag==1)&&(this.warnChanArr[i].ruleId!=item.ruleId)){
            this.indexTarget = 1;
            break;
          }else{
            this.indexTarget = 0;
          }
        }
        if(this.indexTarget == 0){
          for(let i=0;i<this.warnChanArr.length;i++) {
            if (this.warnChanArr[i].recognitionCategory.cateId == 8 || this.warnChanArr[i].recognitionCategory.cateId == 10|| this.warnChanArr[i].recognitionCategory.cateId == 23|| this.warnChanArr[i].recognitionCategory.cateId == 25|| this.warnChanArr[i].recognitionCategory.cateId == 30) {
              this.warnChanArr[i].selected1 = 2;
            }
          }
        }
        //console.log(this.warnChanArr);
      }else{
        if(item.recognitionCategory.cateId==8||item.recognitionCategory.cateId==10||item.recognitionCategory.cateId==23||item.recognitionCategory.cateId==25){
          for(let i=0;i<this.warnChanArr.length;i++){
            if(this.warnChanArr[i].recognitionCategory.cateId==30){
              this.warnChanArr[i].selected1=1;
            }
          }
        }else if(item.recognitionCategory.cateId==30){
          for(let i=0;i<this.warnChanArr.length;i++){
            if(this.warnChanArr[i].recognitionCategory.cateId==8||this.warnChanArr[i].recognitionCategory.cateId==10||this.warnChanArr[i].recognitionCategory.cateId==23||this.warnChanArr[i].recognitionCategory.cateId==25){
              this.warnChanArr[i].selected1=1;
            }
          }
        }
      }
    }
    if(!item.flag||item.flag==2){
      item.flag=1;
      if(item.channelName){
        this.warnChan.push(item.channelName);
        this.warnChanId.push(item.channelId);
        this.chanChange.emit(this.warnChan);
        this.chanChangeId.emit(this.warnChanId);
      }else{
        this.warnChan.push(item.ruleName);
        this.warnChanId.push(item.ruleId);
        this.chanChange.emit(this.warnChan);
        this.chanChangeId.emit(this.warnChanId);
      }
    }else{
      item.flag=2;
      for(let i=0;i<this.warnChan.length;i++){
        if(item.channelName) {
          if (this.warnChan[i] == item.channelName) {
            this.warnChan.splice(i, 1);
            this.warnChanId.splice(i, 1);
            this.chanChange.emit(this.warnChan);
            this.chanChangeId.emit(this.warnChanId);
          }
        }else{
          if (this.warnChan[i] == item.ruleName) {
            this.warnChan.splice(i, 1);
            this.warnChanId.splice(i, 1);
            this.chanChange.emit(this.warnChan);
            this.chanChangeId.emit(this.warnChanId);
          }
        }
      }
    }
  }
  stopPropagetion(e:any){
    var oev = e || event;
    oev.stopPropagation();
  }
  getSrc(item) {
    return ('../assets/alarmrlues/' + (item.flag == 1 ? 'checked.png' : 'unchecked.png'));
  }
}
