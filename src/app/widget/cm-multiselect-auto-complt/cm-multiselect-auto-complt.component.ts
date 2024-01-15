import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'cm-multiselect-auto-complt',
  templateUrl: './cm-multiselect-auto-complt.component.html',
  styleUrls: ['./cm-multiselect-auto-complt.component.css']
})
export class CmMultiselectAutoCompltComponent implements OnInit {
  @Input() inputData: any;
  @Input() dropdownSettings: IDropdownSettings = {};
  @Input() label: string;
  @Output() selectedItem = new EventEmitter<any>();
  @Output() deSelectedItem = new EventEmitter<any>();
  constructor() { }

  ngOnInit() { }

  onMaterialGroupChange(event: any) {
    console.log(event);
  }
  onItemSelect(item: any, type: number) {
    if(type == 1)
      this.selectedItem.emit(item);
    else 
      this.deSelectedItem.emit(item);
  }
  selectAll(item: any, type: number) {
    if(type == 1)
      this.selectedItem.emit(item);
    else 
      this.deSelectedItem.emit(item);
  }
}
