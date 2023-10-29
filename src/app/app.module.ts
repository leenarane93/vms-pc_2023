import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './interceptor/interceptors/loader.interceptor';
import { AuthInterceptor } from './interceptor/interceptors/auth.interceptor';
import { UserComponent } from './components/user/user/user.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { MapViewComponent } from './components/dashboard/map-view/map-view.component';
import { RoleComponent } from './components/user/role/role.component';
import { EncdecComponent } from './components/_extras/encdec/encdec.component';
import { ToastrModule } from 'ngx-toastr';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { AdminConfigurationComponent } from './components/admin/admin-configuration/admin-configuration.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { BulkUploadComponent } from './components/admin/bulk-upload/bulk-upload.component';
import { NgChartsModule } from 'ng2-charts';
import { ZoneMngComponent } from './components/admin/zone-mng/zone-mng.component';
import { Globals } from './utils/global';
import { CmTableComponent } from './widget/cm-table/cm-table.component';
import { CmPaginationComponent } from './widget/cm-pagination/cm-pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CmModalComponent } from './widget/cm-modal/cm-modal.component';
import { AddZoneComponent } from './components/admin/add-zone/add-zone.component';
import { ErrorPageComponent } from './components/shared/error-page/error-page.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { CmLeafletComponent } from './components/shared/cm-leaflet/cm-leaflet.component';
import { VmsMasterComponent } from './components/admin/VMS_Management/vms-master/vms-master.component';
import { AddVmsComponent } from './components/admin/VMS_Management/add-vms/add-vms.component';
import { DrawMap } from 'leaflet';
const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigurationComponent,
    LoaderComponent,
    UserComponent,
    HeaderComponent,
    DashboardComponent,
    SidebarComponent,
    MapViewComponent,
    RoleComponent,
    EncdecComponent,
    AdminDashboardComponent,
    AdminConfigurationComponent,
    BulkUploadComponent,
    ZoneMngComponent,
    CmTableComponent,
    CmPaginationComponent,
    CmModalComponent,
    AddZoneComponent,
    ErrorPageComponent,
    CmLeafletComponent,
    VmsMasterComponent,
    AddVmsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BackButtonDisableModule.forRoot({
      preserveScroll: true
    }),
    NgbModule,
    NgChartsModule,
    LeafletModule,
    NgxPaginationModule,
    LeafletDrawModule,
    LeafletModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NgbActiveModal,
    JwtHelperService,
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
