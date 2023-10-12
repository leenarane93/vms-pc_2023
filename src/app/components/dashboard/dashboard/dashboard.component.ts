import { Component } from '@angular/core';
import { OnInit,   ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';

declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private _userfacadeservice:UserFacadeService,
              private _router:Router){
    
  }
  vmsList: any = [];
  
  ngOnInit(): void {
    
  }
 
 
 
 }
