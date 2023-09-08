import { Component, Input } from '@angular/core';
import * as $ from 'jquery';
import { User } from 'src/app/models/response/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user?: User | null;
  @Input() title: string = '';

  constructor() {
    //this.accountService.user.subscribe(x => this.user = x);
  }
  ngOnInit() {

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
    //this.accountService.logout();
  }

}
