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
import {AppTestComponent} from './apptest/apptest.compontent';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    TestComponent,
    AppManageComponent,
    AppTestComponent
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
