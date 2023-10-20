import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cm-modal',
  templateUrl: './cm-modal.component.html',
  styleUrls: ['./cm-modal.component.css']
})
export class CmModalComponent {
  type!: string;
  @Input() public data:any;

}
