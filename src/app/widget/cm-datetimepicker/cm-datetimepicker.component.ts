import { Component, OnInit, Input, forwardRef, ViewChild, AfterViewInit, Injector } from '@angular/core';
import { NgbTimeStruct, NgbDateStruct, NgbPopoverConfig, NgbPopover, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateTimeModel } from '../../models/DateTimeModel';
import { noop } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cm-datetimepicker',
  templateUrl: './cm-datetimepicker.component.html',
  styleUrls: ['./cm-datetimepicker.component.css'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CmDatetimepickerComponent),
      multi: true
    }
  ]
})
export class CmDatetimepickerComponent implements OnInit, AfterViewInit {
  @Input() type: string = 'from';
  @Input() inputDatetimeFormat = 'M/d/yyyy H:mm:ss';
  @Input() fromYear: any;
  @Input() toYear: any;
  months: any;
  years: any[] = [];
  days: any[] = [];
  timeText: string;
  totalYearsCount: number = 0;
  daysCount: number = 31;
  hours: any[] = [];
  minutes: any[] = [];
  selectedHour: any;
  isFormValidate :boolean = false;

  constructor(private config: NgbPopoverConfig,
    private inj: Injector,
    private toast: ToastrService) {
    config.autoClose = 'outside';
    config.placement = 'auto';
  }

  ngOnInit(): void {
    let _monthsArr = [{ "monthName": "January", "value": 1 }, { "monthName": "February", "value": 2 }, { "monthName": "March", "value": 3 },
    { "monthName": "April", "value": 4 }, { "monthName": "May", "value": 5 }, { "monthName": "June", "value": 6 }, { "monthName": "July", "value": 7 },
    { "monthName": "August", "value": 8 }, { "monthName": "September", "value": 9 }, { "monthName": "October", "value": 10 }, { "monthName": "November", "value": 11 },
    { "monthName": "December", "value": 12 }];
    this.months = _monthsArr;
    this.totalYearsCount = this.toYear - this.fromYear;
    let currentYear = this.fromYear;
    for (var i = 0; i < this.totalYearsCount; i++) {
      this.years.push(Number(this.fromYear) + i);
    }

    for (var i = 0; i < 31; i++) {
      this.days.push(i + 1);
    }
    for (var i = 0; i < 24; i++) {
      this.hours.push(i + 1);
    }
    for (var i = 0; i < 60; i++) {
      this.minutes.push(i);
    }
  }

  ngAfterViewInit(): void {

  }

  ValidateTime(ele: any) {
    if (this.timeText == undefined || this.timeText.length != 8) {
      let c = ele.key;
      if (c >= '0' && c <= '9') {
        if (this.timeText != undefined && this.timeText.length == 2) {
          if (this.timeText > '23') {
            this.toast.error("Hours should be less than 24");
            this.isFormValidate =false;
            return false;
          }
          this.timeText = this.timeText + ":";
        }
        else if (this.timeText != undefined && this.timeText.length == 5) {
          let _value = this.timeText.substr(3, 2);
          if (_value > '59') {
            this.toast.error("Minutes should be less than 60");
            this.isFormValidate =false;
            return false;
          }
          this.timeText = this.timeText + ":";
        }
        else if (this.timeText != undefined && this.timeText.length == 7) {
          let _value = this.timeText.substr(6, 1);
          _value = _value + c;
          if (_value > '59') {
            this.toast.error("Seconds should be less than 60");
            this.isFormValidate =false;
            return false;
          }
        }
        return true;
      } else {
        this.isFormValidate =false;
        return false;
      }
    }
    else return false;

  }
}