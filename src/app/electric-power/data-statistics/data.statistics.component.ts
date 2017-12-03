import { Component } from '@angular/core';
declare var $:any;
declare var echarts: any;
@Component({
  selector: 'data-statistics',
  styleUrls: ['./data.statistics.component.css'],
  templateUrl: './data.statistics.html',
  providers: []
})

export class DataStatisticsComponent {
  startTime:string;
  endTime:string;
  d_word_list:any;
  constructor() {
  }
  ngOnInit() {
    $("#start").jeDate({
      isinitVal:true,
      festival: false,
      format: 'YYYY-MM-DD',
    });
    $("#end").jeDate({
      isinitVal:true,
      festival: false,
      format: 'YYYY-MM-DD'
    });
    this.startTime = $('#start').val("");
    this.endTime = $('#end').val("");
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
