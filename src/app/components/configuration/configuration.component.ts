import { Component, OnInit } from '@angular/core';
import { UserFacadeService } from 'src/app/facade/facade_services/user-facade.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  constructor(private _userFacade:UserFacadeService) {}
  ngOnInit(): void {
    
  }
  
}
