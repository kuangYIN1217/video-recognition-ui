import { Component } from '@angular/core';
import {ElectricService} from "../../common/services/electric.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Page} from "../../common/defs/resources";
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
  page: number = 0;
  pageMaxItem: number = 10;
  pageParams = new Page();
  tableList:any[]=[];
  pageNow:number;
  showTable:boolean=true;
  dataList_x:any[]=[];
  dataList_y1:any[]=[];
  dataList_y2:any[]=[];
  intervaly1:number;
  intervaly2:number;
  maxy1:number;
  maxy2:number;
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
  valid(){
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
      this.showTable = true;
    }else{
      this.lineOrTower = 1;
    }
    if(this.particles=='杆塔'){
      this.showTable = false;
      this.lineOrTower = 1;
    }else{
      this.lineOrTower = 0;
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
  }
  search(){
    this.valid();
    this.searchChart(this.lineId,this.towerId,this.taskId,this.lineOrTower,this.startTime,this.endTime);
    this.searchResult(this.lineId,this.towerId,this.taskId,this.lineOrTower,this.startTime,this.endTime,this.page,this.pageMaxItem);
  }
  getPageData(paraParam) {
    this.valid();
    this.searchChart(this.lineId,this.towerId,this.taskId,this.lineOrTower,this.startTime,this.endTime);
    this.searchResult(this.lineId,this.towerId,this.taskId,this.lineOrTower,this.startTime,this.endTime,paraParam.curPage-1,paraParam.pageMaxItem);
    this.pageNow=paraParam.curPage;
    /*    sessionStorage['taskCurPage'] = this.pageNow;
     console.log(sessionStorage['taskCurPage']);*/
  }
  searchChart(lineId,towerId,taskId,lineOrTower,startTime,endTime){
    this.dataList_x = [];
    this.dataList_y1 = [];
    this.dataList_y2 = [];
    this.maxy1 = null;
    this.maxy2 = null;
    this.intervaly1 = null;
    this.intervaly2 = null;
    this.electricService.dataStaticSearch(lineId,towerId,taskId,lineOrTower,startTime,endTime)
      .subscribe(result=>{
        console.log(result);
        for(let i=0;i<result.length;i++){
          if(this.particles=='线路'){
            this.dataList_x.push(result[i].lineName);
            this.dataList_y1.push(result[i].flawTowerCount);
            this.dataList_y2.push(result[i].flawTowerRate*100);
          }else{
            this.dataList_x.push(result[i].towerNum);
            this.dataList_y1.push(result[i].flawFileCount);
            this.dataList_y2.push(result[i].flawFileRate*100);
          }
        }
        this.intervaly1 = Math.ceil(Number(Math.max.apply(null, this.dataList_y1))/5);
        this.maxy1 = this.intervaly1*6;
        this.intervaly2 = Math.ceil(Number(Math.max.apply(null, this.dataList_y2))/5);
        this.maxy2 = this.intervaly2*6;
        console.log(this.maxy1);
        console.log(this.intervaly1);
        console.log(this.maxy2);

        console.log(this.intervaly2);
        this.initEcharts();

      })
  }
  searchResult(lineId,towerId,taskId,lineOrTower,startTime,endTime,page,size){
    this.electricService.dataStaticResult(lineId,towerId,taskId,lineOrTower,startTime,endTime,page,size)
      .subscribe(result=>{
        console.log(result);
        this.tableList = result.content;
        let page = new Page();
        page.pageMaxItem = result.size;
        page.curPage = result.number+1;
        page.totalPage = result.totalPages;
        page.totalNum = result.totalElements;
        this.pageParams = page;
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
      if(day2.getDate()<10){
        this.startTime = year+"-"+(month-1)+"-0"+(day2.getDate());
      }else{
        this.startTime = year+"-"+(month-1)+"-"+(day2.getDate());
      }
    }else{
      if(day1<10){
        this.startTime = year+"-"+month+"-0"+day1;
      }else{
        this.startTime = year+"-"+month+"-"+day1;
      }
    }
    if(day<10){
      this.endTime = year+"-"+month+"-0"+day;
    }else{
      this.endTime = year+"-"+month+"-"+day;
    }
    this.searchChart(0,0,0,0,this.startTime,this.endTime);
    this.searchResult(0,0,0,0,this.startTime,this.endTime,this.page,this.pageMaxItem);
  }
  initEcharts() {
    // 获取data数据
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
      dataZoom : {
        show : true,
        start : 0,
        end : 100
      },
      xAxis: [
        {
          type: 'category',
          data: this.dataList_x,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '数量',
          min: 0,
          max: this.maxy1,
          interval: this.intervaly1,
          axisLabel: {
            formatter: '{value} 个'
          }
        },
        {
          type: 'value',
          name: '比率',
          min: 0,
          max: this.maxy2,
          interval: this.intervaly2,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name:'缺陷杆塔量',
          type:'bar',
          itemStyle: {
            normal: {
              color: '#23a880'
            }
          },
          data:this.dataList_y1
        },
        {
          name:'缺陷杆塔比率',
          type:'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#ff7c35'
            }
          },
          data:this.dataList_y2
        }
      ]
    });
  }
  ngAfterViewInit() {
    $('.detail-header-info .title').text(window.sessionStorage.getItem('applicationName'));
  }
}
