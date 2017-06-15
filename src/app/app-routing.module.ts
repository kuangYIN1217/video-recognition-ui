import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {TestComponent} from "./test/test.component";
import {AppManageComponent} from './appmanage/appmanage.compontent';
import {AppTestComponent} from './apptest/apptest.compontent';

const routes: Routes = [
  //{ path: '', component: NavigationComponent },
  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent},
  {path: 'nav', component: NavigationComponent},
  {path: 'appmanage', component: AppManageComponent},
  {path: 'apptest', component: AppTestComponent},
  {path: '', redirectTo: '/nav', pathMatch: 'full'},
  // { path: 'detail/:id', component: HeroDetailComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
