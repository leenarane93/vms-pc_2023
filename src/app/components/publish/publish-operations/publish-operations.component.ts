import { Component, OnInit } from '@angular/core';

import Stepper from 'bs-stepper';
import { Globals } from 'src/app/utils/global';

@Component({
  selector: 'app-publish-operations',
  templateUrl: './publish-operations.component.html',
  styleUrls: ['./publish-operations.component.css']
})
export class PublishOperationsComponent implements OnInit {
  stepper: Stepper;
  constructor(private global:Globals){
    this.global.CurrentPage = "Publish Operations";
  }
  BackToList() {}
  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1') as HTMLElement, {
      linear: false,
      animation: true
    });
  }

}
