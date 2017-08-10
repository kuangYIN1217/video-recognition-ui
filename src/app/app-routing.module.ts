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
import {ChannelComponent} from "./channel/channel.component";
import {WarnRlueComponent} from "./appdetail/warn-rlue/warnrlue.component";
const routes: Routes = [
  //{ path: '', component: NavigationComponent },
  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent},
  {path: 'nav', component: NavigationComponent},
  {path: 'appmanage', component: AppManageComponent},
  {path: 'videoanalysis', component: VideoAnalysisComoponent},
  {path: 'waymanage', component: WayManageComponent},
  {path: 'technologysupport', component: TechnologySupportComponent},
  {path: 'monitorreport', component: MonitorReportComponent},
  {path: 'page', component: PageComponent},
  {path: 'taskmanage', component: TaskManageComponent},
  {path: 'createtext', component: CreateTextComponent},
  {path: 'alarmrules', component: AlarmRluesComponent},
  {path: 'warnmanage', component: WarnComponent},
  {path: 'channel', component: ChannelComponent},
  {path: 'warnrlue', component: WarnRlueComponent},

  {path: '', redirectTo: '/appmanage', pathMatch: 'full'},
  // { path: 'detail/:id', component: HeroDetailComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
