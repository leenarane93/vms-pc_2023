import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { AuthGuradService } from './_auth/auth-gurad.service';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "config",
    component: ConfigurationComponent,
    canActivate:[AuthGuradService]
  },
  {
    path: "user",
    component: UserComponent,
    canActivate:[AuthGuradService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
