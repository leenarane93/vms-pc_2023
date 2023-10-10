import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getErrorMsg } from '../../utils/utils';
import { HttpService } from 'src/app/facade/services/common/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';
import { LoaderService } from 'src/app/facade/services/common/loader.service';
import { Login } from 'src/app/models/request/Login';
import { environment } from 'src/environment';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/facade/services/user/authentication.service';
import { UserLoggedIn } from 'src/app/models/$bs/userLoggedIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  version!: string;
  loading = false;
  submitted = false;
  config$!: Observable<any>;
  _isLoggedIn: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private _authenticationService:AuthenticationService,
    private loaderService: LoaderService,
    private router: Router,
    private _facadeService: UserFacadeService,
    private toastr: ToastrService) {
    //this.config$ = this._facadeService._configData$;
    console.log(this._facadeService.getApiUrl());
    this.version = environment.version;
  }
  get f() { return this.form.controls; }
  ngOnInit() {
    const bs$ = new BehaviorSubject(this._facadeService.items$);
    console.log(bs$.getValue());
    this._facadeService.items$;
    this._facadeService.removeSessionValue("access_token");
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }

  loggedIn() {
    let _login = new Login();
    const bs$ = new BehaviorSubject(this._facadeService.items$);
    _login.Password = this.form.controls["password"].value;
    _login.Username = this.form.controls["username"].value;
    this._facadeService.loginAuthenticate(_login);
    this._authenticationService.login(_login).subscribe(res =>{
      if(res!=null){
        if(res.status == 1)
          this.router.navigate(["dashboard"]);
        else
          this.toastr.error("Invalid username or password.");
      }
    })
  }
}