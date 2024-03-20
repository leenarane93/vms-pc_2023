import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFacadeService } from './facade/facade_services/user-facade.service';
import { User } from './models/response/User';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { SessionService } from './facade/services/common/session.service';
import { CommonFacadeService } from './facade/facade_services/common-facade.service';
import {SocketFacadeService} from './facade/facade_services/socket-facade.service';
import { HubConnection,HubConnectionBuilder  } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vms-pc';
  public _hubConnecton: HubConnection;
  message:string;
  messages:any[]=[];
  config$!:Observable<any>;
  user!:User;
  loggedIn:boolean=false;
  secretCode:any;
  constructor(private _facadeService:UserFacadeService,
              private _router: Router,
              private _commonFacade:CommonFacadeService,
              private chatService: SocketFacadeService,
              private _toast:ToastrService
              ){ 
    console.log(this.loggedIn);
    this._facadeService.isLoggedin.subscribe(x => {
      this.loggedIn = x.LoggedIn;
      if(x.LoggedIn == false)
        this._router.navigate(['login']);
    });
   }
  //loggedIn = this._facadeService.isLoggedin;
  
  ngOnInit(): void {
    this.user = this._facadeService.user;
    this._commonFacade.setSwaggerUrl();
    //this._facadeService.getConfigDetails();


    // this._hubConnecton = new HubConnectionBuilder().withUrl(environment.SSE_Url).build();
    // this._hubConnecton
    //   .start()
    //   .then(() => console.log('Connection started!'))
    //   .catch(err => console.log('Error while establishing connection :('));

    // this._hubConnecton.on('BroadcastMessage', (type: string, payload: string) => {
    //   //this.messages.push({ severity: type, summary: payload });
    //   console.log("Type : "+type + " ----- Message : "+payload);
    //   if(type == "success") 
    //     this._toast.success(payload,"Success");
    //   else if(type == "error")
    //     this._toast.error(payload,"Error");
    //   else if(type == "warning")
    //     this._toast.warning(payload,"Warning");
    //   else if(type == "notify")
    //     this._toast.info(payload,"Info");
    // });
  }

}
