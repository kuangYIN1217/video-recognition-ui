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
  {path: '', redirectTo: '/appmanage', pathMatch: 'full'},
  // { path: 'detail/:id', component: HeroDetailComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
