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
import { ZoneMngComponent } from './components/admin/zone-mng/zone-mng.component';
import { AddZoneComponent } from './components/admin/add-zone/add-zone.component';
import { ErrorPageComponent } from './components/shared/error-page/error-page.component';

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
    data:{title :'Configuration'},
    canActivate:[AuthGuradService]
  },

  {
    path: "users/user-master",
    component: UserComponent,
    data:{title :'User Management'},
    canActivate:[AuthGuradService]
  },

  {
    path: "users/role-master",
    component: RoleComponent,
    data:{title :'Role Management'},
    canActivate:[AuthGuradService]
  },

  { path: 'dashboard', 
    component:DashboardComponent, 
    data:[{title :'Dashboard'}],
    canActivate:[AuthGuradService]
  },
  { path: 'admin-dashboard', 
  data:{title :'Dashboard'},
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
  {
    path:'masters/zone-master',
    component:ZoneMngComponent,
    data:{title :'Zone Management'},
    canActivate:[AuthGuradService]
  },
  {
    path: "admin/add-zone",
    component: AddZoneComponent,
    data:{title :'Add Zone'},
    canActivate:[AuthGuradService]
  },
  { path: 'error-page', 
    component:ErrorPageComponent,
    canActivate:[AuthGuradService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
