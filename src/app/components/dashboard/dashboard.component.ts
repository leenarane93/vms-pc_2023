import { Component } from '@angular/core';
import { OnInit,   ViewChild} from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  vmsList: any = [];
  
  ngOnInit(): void {
    
  }
 
 
 
 }
