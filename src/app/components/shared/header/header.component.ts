import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';
import { User } from 'src/app/models/response/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user?: User | null;
  title: any;
  username:string="";
  constructor(private _userFacade:UserFacadeService,
              private route:ActivatedRoute) {
    //this.accountService.user.subscribe(x => this.user = x);
  }
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title = data;
      console.log(this.title);
    });
    console.log(this.title);
    this.title = this.route.snapshot.data['data'];
    console.log(this.title);
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
