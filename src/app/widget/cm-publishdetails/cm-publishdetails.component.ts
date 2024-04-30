import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cm-publishdetails',
  templateUrl: './cm-publishdetails.component.html',
  styleUrls: ['./cm-publishdetails.component.css']
})
export class CmPublishdetailsComponent {
  constructor(private modalService:NgbModal){

  }
  closeModal() {
    this.modalService.dismissAll();
  }
}
