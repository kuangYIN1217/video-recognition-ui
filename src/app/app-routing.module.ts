
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {TestComponent} from "./test/test.component";
import {AppManageComponent} from './appmanage/appmanage.compontent';
import {MonitorReportComponent} from './appdetail/monitor-report/monitor.report.component'
import {TechnologySupportComponent} from './appdetail/technology-support/technology.support.component'
import {WayManageComponent} from './appdetail/way-manage/way.manage.component'
import {VideoAnalysisComoponent} from './appdetail/video-analysis/video.analysis.component'
import {PageComponent} from "./page/page.component";
import {TaskManageComponent} from "./taskmanage/taskmanage.component";
import {CreateTextComponent} from "./taskmanage/createtext/createtext.componment";
import {AlarmRluesComponent} from "./taskmanage/alarmrlues/alarmrlues";
import { WarnComponent } from './appdetail/warn-manage/warn.component'
import {WarnRlueComponent} from "./appdetail/warn-rlue/warnrlue.component";
import {WarnWindowComponent} from "./appdetail/warnwindow/warnwindow.component";
import {TipsComponent} from "./tips/tips.component";
import {WarnDetailComponent} from "./appdetail/warn-detail/warn.detail.component";
import {DataManageComponent} from "./electric-power/data-manage/data.manage.component";
import {DataStatisticsComponent} from "./electric-power/data-statistics/data.statistics.component";
import {OverviewMapComponent} from "./electric-power/overview-map/overview.map.component";
import {ElecTaskManageComponent} from "./electric-power/task-manage/task.manage.component";
import {SystemMonitoringComponent} from "./account/system-monitoring/system.monitoring.component";
import {AccountManageComponent} from "./account/account-manage/account.manage.component";
import {AccessManageComponent} from "./account/access-manage/access.manage.component";
import {PersonalCenterComponent} from "./account/personal.center.component";
import {GroupManageComponent} from "app/account/group-manage/group.manage.component";
import {CreateUserComponent} from "./account/createUser/createUser.component";
import {CreateGroupComponent} from "./account/group-manage/createGroup/createGroup.component";
import {CreateGroup2Component} from "./account/group-manage/createGroup2/createGroup2.component";
import {CreateInspectionComponent} from "./electric-power/data-manage/createInspection/createInspection.component";
import {CreateTaskComponent} from "./electric-power/task-manage/createTask/createTask.component";
import {TaskResultComponent} from "./electric-power/task-manage/taskResult/task.result.component";
import {EditResultComponent} from "./electric-power/task-manage/editResult/editResult.component";

const routes: Routes = [
  //{ path: '', component: NavigationComponent },
  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent},
  {path: 'nav', component: NavigationComponent},
  {path: 'appmanage', component: AppManageComponent},
  {path: 'videoanalysis', component: VideoAnalysisComoponent},
  {path: 'waymanage', component: WayManageComponent},
  {path: 'waymanage/:status', component: WayManageComponent},
  {path: 'technologysupport', component: TechnologySupportComponent},
  {path: 'monitorreport', component: MonitorReportComponent},
  {path: 'page', component: PageComponent},
  {path: 'taskmanage', component: TaskManageComponent},
  {path: 'taskmanage/:status', component: TaskManageComponent},
  {path: 'createtext', component: CreateTextComponent},
  {path: 'alarmrules', component: AlarmRluesComponent},
  {path: 'warnmanage', component: WarnComponent},
  {path: 'warnmanage/:status', component: WarnComponent},
  {path: 'warnrlue', component: WarnRlueComponent},
  {path: 'warnwindow', component: WarnWindowComponent},
  {path: 'tips', component: TipsComponent},
  {path: 'warndetail', component: WarnDetailComponent},
  {path: 'datamanage', component: DataManageComponent},
  {path: 'datamanage/:status', component: DataManageComponent},
  {path: 'datastatistics', component: DataStatisticsComponent},
  {path: 'overviewmap', component: OverviewMapComponent},
  {path: 'overviewmap/:status', component: OverviewMapComponent},
  {path: 'electaskmanage', component: ElecTaskManageComponent},
  {path: 'personalcenter', component: PersonalCenterComponent},
  {path: 'personalcenter/:status', component: PersonalCenterComponent,
    children:[
      {path: 'systemmonitoring', component: SystemMonitoringComponent,outlet:'aux'},
      {path: 'accountmanage', component: AccountManageComponent,outlet:'aux'},
      {path: 'accessmanage', component: AccessManageComponent,outlet:'aux'},
      {path: 'groupmanage', component: GroupManageComponent,outlet:'aux'},
      {path: 'createuser', component: CreateUserComponent,outlet:'aux'},
      {path: 'creategroup', component: CreateGroupComponent,outlet:'aux'},
      {path: 'creategroup2', component: CreateGroup2Component,outlet:'aux'}
]
  },
  {path: 'createinspection', component: CreateInspectionComponent},
  {path: 'createtask', component: CreateTaskComponent},
  {path: 'taskresult', component: TaskResultComponent},
  {path: 'editresult', component: EditResultComponent},
  {path: '', redirectTo: '/appmanage', pathMatch: 'full'},
  // { path: 'detail/:id', component: HeroDetailComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
