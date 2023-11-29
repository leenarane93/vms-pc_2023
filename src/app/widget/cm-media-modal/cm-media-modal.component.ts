import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cm-media-modal',
  templateUrl: './cm-media-modal.component.html',
  styleUrls: ['./cm-media-modal.component.css']
})
export class CmMediaModalComponent {
  @Input() data:any;
} 
