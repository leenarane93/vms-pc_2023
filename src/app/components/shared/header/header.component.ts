import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { CommonFacadeService } from 'src/app/facade/facade_services/common-facade.service';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';
import { SessionService } from 'src/app/facade/services/common/session.service';
import { User } from 'src/app/models/response/User';
import { Globals } from 'src/app/utils/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user?: User | null;
  title?: any;
  username:string="";
  global: Globals;
  constructor(private _userFacade:UserFacadeService,
              private route:ActivatedRoute,
              private _commonFacade:CommonFacadeService,
              private globals:Globals) {
                this.global = globals;
    //this.accountService.user.subscribe(x => this.user = x);
  }
  ngOnInit() {
    this.title = this.global.CurrentPage;
    this.user =this._userFacade.user;
    this.username =this.user.username;
    var body = $("body");
    $('[data-toggle="minimize"]').on("click", function () {
      if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
        body.toggleClass('sidebar-hidden');
      } else {
        body.toggleClass('sidebar-icon-only');
      }
    });

    $('[data-toggle="offcanvas"]').on("click", function () {
      $('.sidebar-offcanvas').toggleClass('active')
    });
  }

  logout() {
    this._userFacade.ClearUserObject();
  }

}
