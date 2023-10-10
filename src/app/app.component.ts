import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFacadeService } from './facade/facade_services/user-facade.service';
import { User } from './models/response/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vms-pc';
  config$!:Observable<any>;
  user!:User;
  loggedIn:boolean=false;
  constructor(private _facadeService:UserFacadeService,
              private _router: Router){ 
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
    //this._facadeService.getConfigDetails();
  }
}
