import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {getErrorMsg} from '../../utils/utils';
import { HttpService } from 'src/app/facade/services/common/http.service';
import { Observable } from 'rxjs';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';
import { LoaderService } from 'src/app/facade/services/common/loader.service';
import { Login } from 'src/app/models/request/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  config$!:Observable<any>;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loaderService:LoaderService,
    private router: Router,
    private _facadeService : UserFacadeService) {
      //this.config$ = this._facadeService._configData$;
      console.log(this._facadeService.getApiUrl());
  }
  get f() { return this.form.controls; }
  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  getErrorMessage(_controlName:any,_controlLable:any,_isPattern:boolean=false,_msg:string){
    return getErrorMsg(this.form,_controlName,_controlLable,_isPattern,_msg);
  }

  loggedIn(){
    let _login =new Login();
    _login.Password = "Cms@123$";
    _login.Username = "admin";
    this._facadeService.loginAuthenticate(_login);
  }
}