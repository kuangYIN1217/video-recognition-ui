import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
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

/* import { CkplayerComponent } from './ckplayer/ckplayer.component' */
import { JWplayerComponent } from './jwplayer/jwplayer.component'
import {PageComponent} from "./page/page.component";
import {TaskManageComponent} from "./taskmanage/taskmanage.component";
import {CreateTextComponent} from "./taskmanage/createtext/createtext.componment";
import {AlarmRluesComponent} from "./taskmanage/alarmrlues/alarmrlues";
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
    AlarmRluesComponent
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
    //BrowserAnimationsModule,
  ],
  providers: [StompService],
  bootstrap: [NavigationComponent]
})
export class AppModule {

}
