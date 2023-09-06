import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFacadeService } from './facade/facade_services/user-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vms-pc';
  config$!:Observable<any>;
  constructor(private _facadeService:UserFacadeService){

  }
  ngOnInit(): void {
    //this._facadeService.getConfigDetails();
  }
}
