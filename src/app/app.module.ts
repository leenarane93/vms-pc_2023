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
import { PartyMngComponent } from './components/admin/party-mng/party-mng.component';
import { AddPartyComponent } from './components/admin/party-mng/add-party/add-party.component';
import { TariffMngComponent } from './components/admin/tariff-mng/tariff-mng.component';
import { AddTariffComponent } from './components/admin/tariff-mng/add-tariff/add-tariff.component';
import { CmConfirmBoxComponent } from './widget/cm-confirm-box/cm-confirm-box.component';
import { ConfirmationDialogService } from './facade/services/confirmation-dialog.service';
import { CmMapBoxComponent } from './widget/cm-map-box/cm-map-box.component';
const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { MediaClearanceComponent } from './components/admin/media-clearance/media-clearance.component';
import { RoleMasterComponent } from './components/user/role-master/role-master.component';
import { AddRoleComponent } from './components/user/role-master/add-role/add-role.component';
import { AccessConfigComponent } from './components/user/role-master/access-config/access-config.component'
import { DataTablesModule } from 'angular-datatables';
import { AddUserComponent } from './components/user/user/add-user/add-user.component';
import { MediaUploadComponent } from './components/media/media-upload/media-upload.component';
import { PlaylistCreationComponent } from './components/media/playlist-creation/playlist-creation.component';
import { PlaylistConfigureComponent } from './components/media/playlist-configure/playlist-configure.component';
import { CmTooltipComponent } from './widget/cm-tooltip/cm-tooltip.component';
import { TooltipDirective } from './interceptor/interceptors/tooltip.directive';
import { CmMediaModalComponent } from './widget/cm-media-modal/cm-media-modal.component';
import { AngularDraggableModule } from 'angular2-draggable';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CdkTableModule } from "@angular/cdk/table";
import { MediaAuditComponent } from './components/media/media-audit/media-audit.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { CmMdAuditComponent } from './widget/cm-md-audit/cm-md-audit.component';
import { PlaylistAuditComponent } from './components/media/playlist-audit/playlist-audit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { PublishOperationsComponent } from './components/publish/publish-operations/publish-operations.component';
import { CmMultiselectAutoCompltComponent } from './widget/cm-multiselect-auto-complt/cm-multiselect-auto-complt.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CmDatetimepickerComponent } from './widget/cm-datetimepicker/cm-datetimepicker.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';

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
    AddVmsComponent,
    PartyMngComponent,
    AddPartyComponent,
    TariffMngComponent,
    AddTariffComponent,
    CmConfirmBoxComponent,
    CmMapBoxComponent,
    MediaClearanceComponent,
    RoleMasterComponent,
    AddRoleComponent,
    AccessConfigComponent,
    AddUserComponent,
    MediaUploadComponent,
    PlaylistCreationComponent,
    PlaylistConfigureComponent,
    CmTooltipComponent,
    TooltipDirective,
    CmMediaModalComponent,
    MediaAuditComponent,
    CmMdAuditComponent,
    PlaylistAuditComponent,
    PublishOperationsComponent,
    CmMultiselectAutoCompltComponent,
    CmDatetimepickerComponent,
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
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BackButtonDisableModule.forRoot({
      preserveScroll: true
    }),
    NgbModule,
    TabsModule.forRoot(),
    NgChartsModule,
    LeafletModule,
    NgxPaginationModule,
    LeafletDrawModule,
    LeafletModule,
    RxReactiveFormsModule,
    DataTablesModule,
    AngularDraggableModule,
    DragDropModule,
    CdkTableModule,
    NgMultiSelectDropDownModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  exports: [TooltipDirective],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  DatePipe,
    NgbActiveModal,
    JwtHelperService, ConfirmationDialogService,
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, Globals],
  bootstrap: [AppComponent],
})
export class AppModule { }
