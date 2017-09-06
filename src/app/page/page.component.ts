import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'page',
  styleUrls: ['./css/page.component.css'],
  templateUrl: './templates/page.html',
  providers: []
})
export class PageComponent {
  @Input('pageParams') pageParams;// 父组件向子组件传值
  @Output() changeCurPage:EventEmitter<string> = new EventEmitter;// 子组件向父组件广播事件，触发改变当前页面的事件

  public pageList = [1, 2, 3, 4, 5];
  public totalPage = 5;
  pageMaxItem =10;
  statusCode:number;
  constructor() {
    let vm = this;
    //console.log('从父组件获取的参数', vm['pageParams']);
  }
  ngOnInit(){
    this.pageParams = {'totalNum':0,'curPage':1,'pageMaxItem':10,'totalPage':0};
  }
  ngOnChanges(...args: any[]) {

  }
  getPageList(pageParams) {
    let pageList=[];
    if(pageParams.totalPage==0){
      pageList.push({
        pageNo: 1
      });
    }else{
      /*分页设置*/
      if (pageParams.totalPage <= 5) {   //如果总的页码数小于5（前五页），那么直接放进数组里显示
        for (let i = 0; i < pageParams.totalPage; i++) {
          pageList.push({
            pageNo: i + 1
          });
        }
      } else if (pageParams.totalPage - pageParams.curPage < 5 && pageParams.curPage > 4) {//如果总的页码数减去当前页码数小于5（到达最后5页），那么直接计算出来显示
        pageList = [
          {
            pageNo: pageParams.curPage - 4
          }, {
            pageNo: pageParams.curPage - 3
          }, {
            pageNo: pageParams.curPage - 2
          }, {
            pageNo: pageParams.curPage - 1
          }, {
            pageNo: pageParams.curPage
          }
        ];
      } else {//在中间的页码数
        let cur = Math.floor((pageParams.curPage - 1) / 5) * 5 + 1;
        pageList = [
          {
            pageNo: cur
          }, {
            pageNo: cur + 1
          }, {
            pageNo: cur + 2
          }, {
            pageNo: cur + 3
          }, {
            pageNo: cur + 4
          },
        ];
      }
    }
    return pageList;
  }
  maxItemChange(){
    this.changePage(1);
  }
  changePage(pageNo) {
    let vm = this;
    //console.log('修改页码', pageNo);
    vm.pageParams.curPage = pageNo;
    vm.pageParams.pageMaxItem = this.pageMaxItem;
    //console.log(vm.pageParams);
    vm.changeCurPage.emit(vm.pageParams);
  }
}
