import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { AuthGuradService } from './_auth/auth-gurad.service';
import { UserComponent } from './components/user/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { MapViewComponent } from './components/dashboard/map-view/map-view.component';
import { RoleComponent } from './components/user/role/role.component';
import { EncdecComponent } from './components/_extras/encdec/encdec.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { AdminConfigurationComponent } from './components/admin/admin-configuration/admin-configuration.component';

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
    path: "encdec",
    component: EncdecComponent,
    canActivate:[AuthGuradService]
  },

  {
    path: "config",
    component: ConfigurationComponent,
    canActivate:[AuthGuradService]
  },

  {
    path: "users/user-master",
    component: UserComponent,
    canActivate:[AuthGuradService]
  },

  {
    path: "users/role-master",
    component: RoleComponent,
    canActivate:[AuthGuradService]
  },

  { path: 'dashboard', 
    component:DashboardComponent, 
    data:{title :'Dashboard'},
    canActivate:[AuthGuradService]
  },
  { path: 'admin-dashboard', 
  component:AdminDashboardComponent,
  //canActivate:[AuthGuradService]
},
{ path: 'admin-config', 
  component:AdminConfigurationComponent, 
  canActivate:[AuthGuradService]
},
  { path: 'map-view', 
    component:MapViewComponent, 
    data:{title :'Map View'},
    canActivate:[AuthGuradService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
