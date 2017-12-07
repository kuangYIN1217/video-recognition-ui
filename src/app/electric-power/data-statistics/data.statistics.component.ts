import { Component } from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
import {Router, ActivatedRoute} from "@angular/router";
declare var $:any;
declare var echarts: any;
@Component({
  selector: 'data-statistics',
  styleUrls: ['./data.statistics.component.css'],
  templateUrl: './data.statistics.html',
  providers: [ElectricService]
})

export class DataStatisticsComponent {
  startTime:string;
  endTime:string;
  d_word_list:any;
  appId:string;
  lineName:string='';
  lineId:number;
  lineArr:any[]=[];
  towerNum:string;
  towerArr:any[]=[];
  taskName:string='';
  taskArr:any[]=[];
  particles:string;
  particlesArr:any[]=["线路","杆塔"];
  towerId:number;
  lineOrTower:number;
  taskId:number;
  constructor(private electricService:ElectricService,private route: ActivatedRoute ,private router: Router) {
    this.appId = window.sessionStorage.getItem("applicationId");
    this.particles = this.particlesArr[0];
    this.electricService.getMapLine(this.appId)
      .subscribe(result=>{
        console.log(result);
        if(result.length>0){
          this.lineArr = result;
          let obj:any={};
          obj.lineName = "全部";
          obj.lineId = "0";
          this.lineArr.unshift(obj);
          this.lineName = this.lineArr[0].lineName;
          this.lineId = this.lineArr[0].lineId;
        }
      });
      this.getAllTowerByAppId();
    this.electricService.getMapTask(this.appId)
      .subscribe(result=>{
        console.log(result);
        if(result.length>0){
          this.taskArr = result;
          let obj:any={};
          obj.taskName = "全部";
          this.taskArr.unshift(obj);
          this.taskName = this.taskArr[0].taskName;
        }

      });
  }
  getAllTowerByAppId(){
    this.electricService.getAllTowersByAppId(this.appId)
      .subscribe(result=>{
        console.log(result);
        this.setTower(result);
      });
  }
  lineChange(){
    if(this.lineName=='全部'){
      this.getAllTowerByAppId();
    }else{
      for(let i=0;i<this.lineArr.length;i++){
        if(this.lineName==this.lineArr[i].lineName){
          this.lineId = this.lineArr[i].lineId;
        }
      }
      this.getTower(this.lineId);
    }
  }
  getTower(lineId){
    this.electricService.getAllTower(lineId)
      .subscribe(result=>{
        console.log(result);
        this.setTower(result);
      })
  }
  setTower(result){
    if(result.length>0){
      this.towerArr = result;
      let obj:any={};
      obj.towerNum = "全部";
      obj.towerId = "0";
      this.towerArr.unshift(obj);
      this.towerNum = this.towerArr[0].towerNum;
    }else{
      this.towerArr = [{"towerNum":"全部","towerId":0}];
    }
  }
  search(){
    if(this.lineName=='全部'){
      this.lineId = 0;
    }else{
      for(let i=0;i<this.lineArr.length;i++){
        if(this.lineName==this.lineArr[i].lineName){
          this.lineId = this.lineArr[i].lineId;
        }
      }
    }
    if(this.towerNum=='全部'){
      this.towerId = 0;
    }else{
      for(let i=0;i<this.towerArr.length;i++){
        if(this.towerNum==this.towerArr[i].towerNum){
          this.towerId = this.towerArr[i].towerId;
        }
      }
    }
    if(this.particles=='线路'){
      this.lineOrTower = 0;
    }else{
      this.lineOrTower = 1;
    }
    if(this.taskName=='全部'){
      this.taskId = 0;
    }else{
      for(let i=0;i<this.taskArr.length;i++){
        if(this.taskName==this.taskArr[i].taskName){
          this.taskId = this.taskArr[i].taskId;
        }
      }
    }
    this.startTime = $('#start').val();
    this.endTime = $('#end').val();

    this.searchResult(this.appId,this.lineId,this.towerId,this.taskId,this.lineOrTower,this.startTime,this.endTime);
  }
  searchResult(appId,lineId,towerId,taskId,lineOrTower,startTime,endTime){
    this.electricService.dataStaticSearch(appId,lineId,towerId,taskId,lineOrTower,startTime,endTime)
      .subscribe(result=>{
        console.log(result);
      })
  }
  ngOnInit() {
    $("#start").jeDate({
      isinitVal:true,
      festival: false,
      format:  'YYYY-MM-DD'
    });
    $("#end").jeDate({
      isinitVal:true,
      festival: false,
      format: 'YYYY-MM-DD'
    });
    var data = new Date();
    let year = data.getFullYear();
    let month:number = data.getMonth()+1;
    let day:number = data.getDate();
    let day1:any= data.getDate()-7;
    console.log(day1);
    if(day1==0){
      let day2 = new Date(year,month,day1);
      this.startTime = year+"-"+(month-1)+"-"+(day2.getDate());
    }else{
      this.startTime = year+"-"+month+"-"+day1;
    }
    this.endTime = year+"-"+month+"-"+day;
    this.initEcharts();
  }
  initEcharts() {
    // 获取data数据
/*    let legend_data = [];
    let series_data = [];
    for (let i = 0 ; i < this.d_word_list.length ; i++) {
      legend_data.push(this.d_word_list[i].des);
      series_data.push({
        value: this.d_word_list[i].ratio,
        name: this.d_word_list[i].des,
        itemStyle: {
          normal: {
            color: this.d_word_list[i].color
          }
        }})
    }*/
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('charts'));
    // 绘制图表
    myChart.showLoading();
    myChart.hideLoading();
    myChart.setOption( {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          //dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
        },
        right:'14%'
      },
      legend: {
        data:['降水量','平均温度']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '水量',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: '温度',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name:'降水量',
          type:'bar',
          itemStyle: {
            normal: {
              color: '#23a880'
            }
          },
          data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name:'平均温度',
          type:'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#ff7c35'
            }
          },
          data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    });
  }
}
