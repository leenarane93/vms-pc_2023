import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cron-mng',
  templateUrl: './cron-mng.component.html',
  styleUrls: ['./cron-mng.component.css']
})
export class CronMngComponent implements OnInit {
  @Input() data: any;
  selectedType: any;
  fromTimeHrs: any;
  toTimeHrs: any;
  weekdays: any = [];
  selectedWeekDays:any;
  days: any = [];
  hoursVisible: boolean = false;
  daysVisible: boolean = false;
  monthsVisible: boolean = false;
  selectedDays: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  playlistId: string = "";
  dropdownSettings: any;
  constructor(private modal: NgbModal) { }


  ngOnInit(): void {
    console.log(this.data);
    if (this.data.ScheduleType == 1)
      this.playlistId = this.data.PlaylistIds[0];
    this.weekdays = [{ "displayName": "Sunday", "value": 1 },
    { "displayName": "Monday", "value": 2 },
    { "displayName": "Tuesday", "value": 3 },
    { "displayName": "Wednesday", "value": 4 },
    { "displayName": "Thursday", "value": 5 },
    { "displayName": "Friday", "value": 6 },
    { "displayName": "Saturday", "value": 7 }]

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'DeSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    let val = { "displayName": "All", "value": 0 }
    for (var i = 1; i <= 31; i++) {
      let val = { "displayName": ("0" + i.toString()).slice(-2), "value": i }
      this.days.push(val);
    }
    
  }

  CronTypeChange() {
    if (this.selectedType == "D") {
      this.hoursVisible = true;
      this.daysVisible = false;
      this.monthsVisible = false;
      this.resetSelectionDays();
    } else if (this.selectedType == "W") {
      this.daysVisible = true;
      this.monthsVisible = false;
      this.hoursVisible = false;
    } else if (this.selectedType == "M") {
      this.monthsVisible = true;
      this.hoursVisible = true;
      this.daysVisible = false;
    }
  }

  ChangeSelectedDays(eve: any, val: number) {
    if (eve != undefined && eve != null) {
      this.hoursVisible = true;
    }
  }
  resetSelectionDays() {
    this.selectedDays = [];
  }
  CloseModal() {
    this.modal.dismissAll();
  }
}
