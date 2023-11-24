import { Component, ElementRef, EventEmitter, Injectable, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Stepper from 'bs-stepper';
import * as $ from 'jquery';
import { Globals } from 'src/app/utils/global';
/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '-';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
	}
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}
@Component({
  selector: 'app-playlist-configure',
  templateUrl: './playlist-configure.component.html',
  styleUrls: ['./playlist-configure.component.css']
})
export class PlaylistConfigureComponent {
  active = 1;
  submitted = false;
  isCompleted=false;
  model2!: string;
  model3!: string;
  time: NgbTimeStruct = { hour: 24, minute: 0, second: 0 };
  time2: NgbTimeStruct = { hour: 24, minute: 0, second: 0 };
  seconds = true;
  @Input() public user:any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  form!:FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
//   selectedItems:Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  zones:Array<any> = [];
  vms:Array<any> = [];
  url:any;
  clicked = false;
  undoClicked = false;
  // appendedHtml: string = '<div><b>this appended html</b></div>';
  @ViewChild('resizeDragDiv') div!: ElementRef<HTMLDivElement>;
  @ViewChild('resizeDragDiv2') div2!: ElementRef<HTMLDivElement>;
 
  private stepper!: Stepper;
  constructor(public activeModal: NgbActiveModal,
              private ngbCalendar: NgbCalendar,
              private renderer: Renderer2, 
              private dateAdapter: NgbDateAdapter<string>, 
              private config: NgbTimepickerConfig, 
              private fb: FormBuilder,
              private global:Globals
  ) { config.seconds = true; config.spinners = false; this.global.CurrentPage = "Playlist Configuration" }
 
  name = 'Angular';

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1')!, {
      linear: false,
      animation: true
    })
  }

  appendBlock(){}
  undoBlock(){}
  prev(){

  }
  BackToList(){}
}
