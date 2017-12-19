import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {FileUploadModule} from "ng2-file-upload";
import {AppRoutingModule} from "./app-routing.module";
import {TestComponent} from "./test/test.component";
import {AmChartsModule} from "amcharts3-angular2";
import { StompService } from 'ng2-stomp-service-fixed';
import {ToastyModule} from 'ng2-toasty';
import {NavigationComponent} from "./navigation/navigation.component";
import {AppManageComponent} from './appmanage/appmanage.compontent';
import {MonitorReportComponent} from './appdetail/monitor-report/monitor.report.component'
import {TechnologySupportComponent} from './appdetail/technology-support/technology.support.component'
import {WayManageComponent} from './appdetail/way-manage/way.manage.component'
import {VideoAnalysisComoponent} from './appdetail/video-analysis/video.analysis.component'
import {HeaderComponent} from './header/header.component'
import { WarnComponent } from './appdetail/warn-manage/warn.component'
/* import { CkplayerComponent } from './ckplayer/ckplayer.component' */
import { JWplayerComponent } from './jwplayer/jwplayer.component'
import {PageComponent} from "./page/page.component";
import {TaskManageComponent} from "./taskmanage/taskmanage.component";
import {CreateTextComponent} from "./taskmanage/createtext/createtext.componment";
import {AlarmRluesComponent} from "./taskmanage/alarmrlues/alarmrlues";
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
import {ChooseProjectComponent} from "./account/group-manage/chooseProject/choose.project.component";
import {CreateProjectComponent} from "./createProject/createProject.component";
import {CreateInspectionComponent} from "./electric-power/data-manage/createInspection/createInspection.component";
import {CustomComponent} from "./electric-power/data-manage/custom/custom.component";
import {DeleteTipsComponent} from "./electric-power/deleteTips/deleteTips.component";
import {SynchronizationComponent} from "./electric-power/overview-map/synchronization/synchronization.component";
import {CreateTaskComponent} from "./electric-power/task-manage/createTask/createTask.component";
import {FlawComponent} from "./electric-power/task-manage/flaw/flaw.component";
import {DeleteTipComponent} from "app/account/deleteTip/deleteTip.component";
import {EchartsNg2Module} from "echarts-ng2";
import {TaskResultComponent} from "./electric-power/task-manage/taskResult/task.result.component";
import {NgModule} from "@angular/core";
import {EditResultComponent} from "./electric-power/task-manage/editResult/editResult.component";
import { NgxAmapModule } from 'ngx-amap';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    TestComponent,
    AppManageComponent,
    VideoAnalysisComoponent,
    WayManageComponent,
    TechnologySupportComponent,
    MonitorReportComponent,
    HeaderComponent,
    PageComponent,
    /* CkplayerComponent, */
    JWplayerComponent,
    TaskManageComponent,
    CreateTextComponent,
    AlarmRluesComponent,
    WarnComponent,
    WarnRlueComponent,
    WarnWindowComponent,
    TipsComponent,
    WarnDetailComponent,
    DataManageComponent,
    DataStatisticsComponent,
    OverviewMapComponent,
    ElecTaskManageComponent,
    SystemMonitoringComponent,
    AccountManageComponent,
    AccessManageComponent,
    PersonalCenterComponent,
    GroupManageComponent,
    CreateUserComponent,
    CreateGroupComponent,
    CreateGroup2Component,
    ChooseProjectComponent,
    CreateProjectComponent,
    CreateInspectionComponent,
    CustomComponent,
    DeleteTipsComponent,
    SynchronizationComponent,
    CreateTaskComponent,
    FlawComponent,
    DeleteTipComponent,
    TaskResultComponent,
    EditResultComponent
    //InputReadonlyDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    AmChartsModule,
    ToastyModule,
    EchartsNg2Module,
    NgxAmapModule.forRoot({
      apiKey: '187907670e75adc7c356266ef96b29d1'
    })
    //BrowserAnimationsModule,
  ],
  providers: [StompService],
  bootstrap: [NavigationComponent]
})
export class AppModule {

}
